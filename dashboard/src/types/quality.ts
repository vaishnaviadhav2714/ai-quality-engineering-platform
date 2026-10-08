export type QualityStatus = 'passed' | 'warning' | 'failed';

export type QualityArea = 'automation' | 'security' | 'performance' | 'accessibility';

export interface QualityMetric {
  area: QualityArea;

  tool: string;

  status: QualityStatus;

  summary: string;

  score?: number;
}

export interface QualityIntelligence {
  summary: string;

  keyRisks: string[];

  recommendedActions: string[];

  confidence: 'high' | 'medium' | 'low';
}

export interface QualitySnapshot {
  application: string;

  timestamp: string;

  metrics: QualityMetric[];

  overallStatus: QualityStatus;

  overallScore: number;

  intelligence?: QualityIntelligence;
}
