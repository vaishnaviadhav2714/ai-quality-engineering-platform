import { AIProvider } from '../../providers/ai-provider';
import { qualityAnalysisPrompt } from '../../prompts/quality-analysis-prompt';
import { QualityAnalysis, QualityEvidence } from './types';
import { qualityAnalysisSchema } from './validation';

export class QualityAnalyzer {
  constructor(private readonly provider: AIProvider) {}

  async analyze(evidence: QualityEvidence): Promise<QualityAnalysis> {
    const prompt = qualityAnalysisPrompt.replace(
      '{{qualityEvidence}}',
      JSON.stringify(evidence, null, 2),
    );

    const response = await this.provider.generate(prompt);

    const parsedResponse: unknown = JSON.parse(response);

    return qualityAnalysisSchema.parse(parsedResponse);
  }
}
