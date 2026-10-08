import { AIProvider } from '../../providers/ai-provider';
import { requirementAnalysisPrompt } from '../../prompts/requirement-analysis-prompt';
import { requirementAnalysisSchema } from './validation';
import { createRequirementAnalysisFallback } from './fallback';
import { RequirementInput, RequirementAnalysis } from './types';

export class RequirementAnalyst {
  constructor(private readonly provider: AIProvider) {}

  async analyze(input: RequirementInput): Promise<RequirementAnalysis> {
    const prompt = requirementAnalysisPrompt
      .replace('{{requirement}}', input.requirement)
      .replace('{{context}}', input.context ?? 'No additional context provided.');

    try {
      const response = await this.provider.generate(prompt);

      const parsedResponse: unknown = JSON.parse(response);

      return requirementAnalysisSchema.parse(parsedResponse);
    } catch {
      return createRequirementAnalysisFallback(input);
    }
  }
}
