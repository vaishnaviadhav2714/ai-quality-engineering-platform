export interface QualityIntelligence {
  summary: string;

  keyRisks: string[];

  recommendedActions: string[];

  confidence: 'high' | 'medium' | 'low';
}
