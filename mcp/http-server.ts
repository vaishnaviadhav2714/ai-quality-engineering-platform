import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

const PORT = 4100;
const HOST = '127.0.0.1';

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';

const OLLAMA_MODEL = 'qwen3:1.7b';

const QUALITY_ENGINE_URL = 'http://127.0.0.1:4000/ai-analyze';

const snapshotPath = resolve(process.cwd(), 'quality-engine', 'reports', 'quality-snapshot.json');

type SessionTransport = StreamableHTTPServerTransport;

const sessions = new Map<string, SessionTransport>();

async function readSnapshot(): Promise<Record<string, unknown>> {
  const content = await readFile(snapshotPath, 'utf-8');

  return JSON.parse(content) as Record<string, unknown>;
}

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'quality-engineering-platform',
    version: '1.0.0',
  });

  server.tool(
    'get_quality_snapshot',
    'Returns the latest quality snapshot for the application.',
    {},
    async () => {
      const snapshot = await readSnapshot();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(snapshot, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    'get_quality_risks',
    'Returns quality metrics that represent warnings or failures.',
    {},
    async () => {
      const snapshot = await readSnapshot();

      const metrics = Array.isArray(snapshot.metrics) ? snapshot.metrics : [];

      const risks = metrics.filter((metric) => {
        if (!metric || typeof metric !== 'object') {
          return false;
        }

        const value = metric as {
          status?: unknown;
        };

        return value.status === 'warning' || value.status === 'failed';
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                risks,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.tool(
    'get_quality_intelligence',
    'Returns the AI quality intelligence from the latest quality snapshot.',
    {},
    async () => {
      const snapshot = await readSnapshot();

      const intelligence = snapshot.intelligence ?? null;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                intelligence,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.tool(
    'get_quality_area',
    'Returns the quality metric for a specific quality area.',
    {
      area: z
        .string()
        .describe('Quality area such as automation, security, performance, or accessibility.'),
    },
    async ({ area }) => {
      const snapshot = await readSnapshot();

      const metrics = Array.isArray(snapshot.metrics) ? snapshot.metrics : [];

      const metric = metrics.find((item) => {
        if (!item || typeof item !== 'object') {
          return false;
        }

        const value = item as {
          area?: unknown;
        };

        return value.area === area;
      });

      if (!metric) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: `Quality area '${area}' was not found.`,
              }),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                application: snapshot.application,
                metric,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.tool(
    'analyze_quality',
    'Uses the local Ollama model to analyze quality evidence.',
    {
      application: z.string(),
      overallScore: z.number(),
      overallStatus: z.string(),
      evidence: z.string(),
    },
    async ({ application, overallScore, overallStatus, evidence }) => {
      const prompt =
        'You are a Quality Engineering analysis assistant.\n\n' +
        'Analyze ONLY the evidence provided below.\n\n' +
        `Application: ${application}\n` +
        `Overall score: ${overallScore}\n` +
        `Overall status: ${overallStatus}\n\n` +
        `Evidence:\n${evidence}\n\n` +
        'Rules:\n' +
        '- Do not invent findings, measurements, causes, or risks.\n' +
        '- Use only information present in the evidence.\n' +
        '- Preserve the severity and status reported by the evidence.\n' +
        '- If the evidence does not identify a specific risk, say: "Insufficient evidence to determine the specific risk."\n' +
        '- Keep the response concise.\n\n' +
        'Return exactly three lines:\n\n' +
        'Summary: one sentence based only on the evidence.\n' +
        'Risk: one sentence based only on the evidence, or "Insufficient evidence to determine the specific risk."\n' +
        'Action: one short evidence-based action.\n\n' +
        'Return only these three lines.';

      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt,
          stream: false,
          think: false,
          options: {
            num_predict: 80,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama request failed with status ${response.status}`);
      }

      const result = (await response.json()) as {
        response?: string;
      };

      const analysis = result.response?.trim() ?? '';

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                application,
                overallScore,
                overallStatus,
                analysis,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
}

async function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    let body = '';

    req.setEncoding('utf-8');

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      resolveBody(body);
    });

    req.on('error', reject);
  });
}

async function proxyAiAnalyze(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await readRequestBody(req);

    const response = await fetch(QUALITY_ENGINE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const responseText = await response.text();

    if (res.headersSent) {
      return;
    }

    res.writeHead(response.status, {
      'Content-Type': response.headers.get('content-type') ?? 'application/json',
    });

    res.end(responseText);
  } catch (error) {
    console.error('AI analyze proxy error:', error);

    if (res.headersSent) {
      return;
    }

    res.writeHead(500, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        error: 'AI analyze proxy failed.',
      }),
    );
  }
}

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    /*
     * n8n AI proxy.
     */
    if (req.method === 'POST' && req.url === '/ai-analyze') {
      await proxyAiAnalyze(req, res);
      return;
    }

    /*
     * MCP endpoint.
     */
    if (req.url !== '/mcp') {
      if (!res.headersSent) {
        res.writeHead(404);
        res.end('Not Found');
      }

      return;
    }

    const sessionIdHeader = req.headers['mcp-session-id'];

    const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;

    /*
     * Existing MCP session.
     */
    if (sessionId) {
      const transport = sessions.get(sessionId);

      if (!transport) {
        if (!res.headersSent) {
          res.writeHead(404, {
            'Content-Type': 'application/json',
          });

          res.end(
            JSON.stringify({
              error: 'MCP session not found.',
            }),
          );
        }

        return;
      }

      await transport.handleRequest(req, res);

      return;
    }

    /*
     * New MCP session.
     *
     * The SDK transport is responsible for
     * sending the MCP session ID header.
     */
    if (req.method === 'POST') {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),

        onsessioninitialized: (newSessionId) => {
          sessions.set(newSessionId, transport);
        },
      });

      transport.onclose = () => {
        const currentSessionId = transport.sessionId;

        if (currentSessionId) {
          sessions.delete(currentSessionId);
        }
      };

      const server = createMcpServer();

      await server.connect(transport);

      await transport.handleRequest(req, res);

      return;
    }

    /*
     * GET/DELETE without a session.
     */
    if (!res.headersSent) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          error: 'Missing MCP session ID.',
        }),
      );
    }
  } catch (error) {
    console.error('MCP HTTP server error:', error);

    if (!res.headersSent) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          error: 'Internal MCP server error.',
        }),
      );
    }
  }
});

httpServer.on('clientError', (error) => {
  console.error('HTTP client error:', error);
});

httpServer.listen(PORT, HOST, () => {
  console.log(`MCP HTTP server running on http://${HOST}:${PORT}/mcp`);
});
