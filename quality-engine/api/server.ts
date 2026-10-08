import { createServer } from 'http';
import { z } from 'zod';

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = 'qwen3:1.7b';

const qualityPayloadSchema = z.object({
  application: z.string().min(1),
  status: z.enum(['passed', 'warning', 'failed']),
  message: z.string().min(1),
});

async function analyzeWithOllama(
  application: string,
  status: string,
  message: string,
): Promise<string> {
  const prompt = `
You are a Quality Engineering analysis assistant.

Analyze ONLY the evidence explicitly provided below.

Application: ${application}
Status: ${status}
Evidence: ${message}

STRICT EVIDENCE RULES:
- The provided evidence is the complete set of available facts.
- Use only facts explicitly present in the evidence.
- Do not infer or assume missing technical details.
- Do not invent vulnerabilities.
- Do not invent security impacts.
- Do not invent causes.
- Do not invent attack scenarios.
- Do not invent affected components.
- Do not invent measurements.
- Do not invent authentication, authorization, encryption, data exposure, or access-control issues unless explicitly stated.
- A warning-level finding remains a warning-level observation unless higher severity is explicitly stated.
- Never upgrade warning-level findings to high or critical severity.
- If the evidence only provides a count of warning-level findings, state that the specific findings and impacts are not provided.
- Do not describe warnings as vulnerabilities unless the evidence explicitly says they are vulnerabilities.
- Recommendations must be directly related to the evidence.
- If the evidence is insufficient, explicitly say so.
- Do not provide examples of possible vulnerabilities.
- Do not explain your reasoning.

Return exactly three short lines:

Summary: <one sentence based only on the evidence>
Risk: <one sentence based only on the evidence, or "Insufficient evidence to determine the specific risk.">
Action: <one short evidence-based action>

Return only these three lines.
`.trim();

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

  const data = (await response.json()) as {
    response?: string;
  };

  if (!data.response) {
    throw new Error('Ollama returned an empty response');
  }

  return data.response.trim();
}

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/quality') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const validatedPayload = qualityPayloadSchema.parse(payload);

        console.log('Validated quality data:');
        console.log(validatedPayload);

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            status: 'received',
            message: 'Quality data received by Quality Engine',
            data: validatedPayload,
          }),
        );
      } catch (error) {
        console.error('Invalid quality data:', error);

        res.writeHead(400, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            status: 'invalid',
            message: 'Invalid quality data',
          }),
        );
      }
    });

    return;
  }

  if (req.method === 'POST' && req.url === '/ai-analyze') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);

        const application = String(payload.application ?? '');
        const status = String(payload.status ?? '');
        const message = String(payload.message ?? '');

        if (!application || !status || !message) {
          throw new Error('application, status and message are required');
        }

        const analysis = await analyzeWithOllama(application, status, message);

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            status: 'success',
            application,
            analysis,
          }),
        );
      } catch (error) {
        console.error('AI analysis error:', error);

        res.writeHead(500, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            status: 'error',
            message: 'AI analysis failed',
          }),
        );
      }
    });

    return;
  }

  res.writeHead(404, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      status: 'not_found',
    }),
  );
});

server.listen(4000, () => {
  console.log('Quality Engine API running on http://localhost:4000');
});
