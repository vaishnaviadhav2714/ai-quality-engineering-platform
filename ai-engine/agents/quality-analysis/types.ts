export type QualityArea = 'security' | 'performance' | 'accessibility';

export interface QualityEvidence {
  area: QualityArea;
  tool: string;
  summary: string;
  findings: string[];
}

export interface QualityAnalysis {
  area: QualityArea;
  risk: 'high' | 'medium' | 'low';
  summary: string;
  keyFindings: string[];
  recommendedActions: string[];
  confidence: 'high' | 'medium' | 'low';
}
