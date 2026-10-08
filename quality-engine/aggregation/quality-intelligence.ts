import { QualityAnalyzer } from '../../ai-engine/agents/quality-analysis/quality-analyzer';
import { QualityEvidence } from '../../ai-engine/agents/quality-analysis/types';
import { QualityAggregator } from './quality-aggregator';
import { QualityIntelligence } from './intelligence';
import { QualityMetric } from './types';
import { mapQualityAnalysisToIntelligence } from './quality-intelligence-mapper';

export class QualityIntelligenceService {
  constructor(
    private readonly aggregator: QualityAggregator,
    private readonly analyzer: QualityAnalyzer,
  ) {}

  async buildSnapshot(
    application: string,
    metrics: QualityMetric[],
    evidence: QualityEvidence,
  ): Promise<{
    application: string;
    timestamp: string;
    metrics: QualityMetric[];
    overallStatus: 'passed' | 'warning' | 'failed';
    overallScore: number;
    intelligence: QualityIntelligence;
  }> {
    const snapshot = this.aggregator.aggregate(application, metrics);

    const analysis = await this.analyzer.analyze(evidence);

    const intelligence = mapQualityAnalysisToIntelligence(analysis);

    return {
      ...snapshot,
      intelligence,
    };
  }
}
