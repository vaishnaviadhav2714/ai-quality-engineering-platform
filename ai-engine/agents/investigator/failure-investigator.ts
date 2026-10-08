import { AIProvider } from '../../providers/ai-provider';
import { failureInvestigationPrompt } from '../../prompts/failure-investigation-prompt';
import { FailureContext, FailureInvestigation } from './types';
import { failureInvestigationSchema } from './validation';

export class FailureInvestigator {
  constructor(private readonly provider: AIProvider) {}

  async investigate(failureContext: FailureContext): Promise<FailureInvestigation> {
    const prompt = failureInvestigationPrompt.replace(
      '{{failureContext}}',
      JSON.stringify(failureContext, null, 2),
    );

    const response = await this.provider.generate(prompt);

    const parsedResponse: unknown = JSON.parse(response);

    return failureInvestigationSchema.parse(parsedResponse);
  }
}
