import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'ai-quality-engineering-mcp',
  version: '1.0.0',
});

async function loadQualitySnapshot() {
  const snapshotPath = resolve(
    process.cwd(),
    'quality-engine',
    'aggregation',
    'sample-snapshot.json',
  );

  const snapshot = await readFile(snapshotPath, 'utf-8');

  return JSON.parse(snapshot) as {
    application: string;
    overallStatus: string;
    overallScore: number;
    metrics: Array<{
      area: string;
      tool: string;
      status: string;
      summary: string;
      score?: number;
    }>;
    intelligence?: {
      summary: string;
      keyRisks: string[];
      recommendedActions: string[];
      confidence: string;
    };
  };
}

server.registerTool(
  'get_quality_snapshot',
  {
    description: 'Returns the current quality snapshot for the OWASP Juice Shop application.',
  },
  async () => {
    const snapshot = await loadQualitySnapshot();

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

server.registerTool(
  'get_quality_risks',
  {
    description: 'Returns quality areas that currently have warning or failed status.',
  },
  async () => {
    const snapshot = await loadQualitySnapshot();

    const risks = snapshot.metrics.filter(
      (metric) => metric.status === 'warning' || metric.status === 'failed',
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              application: snapshot.application,
              overallStatus: snapshot.overallStatus,
              overallScore: snapshot.overallScore,
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

server.registerTool(
  'get_quality_intelligence',
  {
    description: 'Returns AI-generated quality intelligence from the current quality snapshot.',
  },
  async () => {
    const snapshot = await loadQualitySnapshot();

    if (!snapshot.intelligence) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                message: 'No quality intelligence is available.',
              },
              null,
              2,
            ),
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
              intelligence: snapshot.intelligence,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.registerTool(
  'get_quality_area',
  {
    description: 'Returns the quality result for one specific quality area.',
    inputSchema: {
      area: z.enum(['automation', 'security', 'performance', 'accessibility']),
    },
  },
  async ({ area }) => {
    const snapshot = await loadQualitySnapshot();

    const metric = snapshot.metrics.find((item) => item.area === area);

    if (!metric) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                application: snapshot.application,
                area,
                message: 'No quality result was found for this area.',
              },
              null,
              2,
            ),
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

const transport = new StdioServerTransport();

async function startServer() {
  await server.connect(transport);
}

startServer().catch((error) => {
  console.error('MCP server failed to start:', error);
  process.exit(1);
});
