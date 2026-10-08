import { QualityAnalysis } from '../../ai-engine/agents/quality-analysis/types';
import { QualityIntelligence } from './intelligence';

export function mapQualityAnalysisToIntelligence(analysis: QualityAnalysis): QualityIntelligence {
  return {
    summary: analysis.summary,
    keyRisks: analysis.keyFindings,
    recommendedActions: analysis.recommendedActions,
    confidence: analysis.confidence,
  };
}
