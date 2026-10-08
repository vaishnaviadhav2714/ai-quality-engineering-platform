import { AIProvider } from '../../providers/ai-provider';
import { exploratoryTestingPrompt } from '../../prompts/exploratory-testing-prompt';
import { ExploratoryTestPlan } from './types';
import { exploratoryTestPlanSchema } from './validation';

export class ExploratoryTester {
  constructor(private readonly provider: AIProvider) {}

  async explore(application: string, coverage: string): Promise<ExploratoryTestPlan> {
    const prompt = exploratoryTestingPrompt
      .replace('{{application}}', application)
      .replace('{{coverage}}', coverage);

    const response = await this.provider.generate(prompt);

    const parsedResponse: unknown = JSON.parse(response);

    const validatedPlan = exploratoryTestPlanSchema.parse(parsedResponse);

    return {
      suggestions: validatedPlan.suggestions.map((suggestion) => ({
        ...suggestion,
        reviewStatus: 'pending',
      })),
    };
  }
}
