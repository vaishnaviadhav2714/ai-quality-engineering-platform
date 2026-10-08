import { createServer } from 'http';

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = 'qwen3:1.7b';

async function analyzeWithOllama(
  application: string,
  status: string,
  message: string,
): Promise<string> {
  const prompt = `
You are a Quality Engineering assistant.

Analyze the following quality result.

Application: ${application}
Status: ${status}
Message: ${message}

Provide a short professional analysis with:
1. Summary
2. Risk
3. Recommended action

Use only the information provided.
Do not invent test results or security findings.
`;

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
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

  return data.response;
}

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/ai-health') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        status: 'ok',
        message: 'AI endpoint is running',
      }),
    );

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

server.listen(5000, () => {
  console.log('AI endpoint running on http://localhost:5000');
});
