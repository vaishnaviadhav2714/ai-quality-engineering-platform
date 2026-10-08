import { AIProvider } from '../ai-provider';

export class OllamaProvider implements AIProvider {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(baseUrl = 'http://localhost:11434', model = 'qwen3:1.7b') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 600_000);

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
        }),
        signal: controller.signal,
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
    } finally {
      clearTimeout(timeout);
    }
  }
}
