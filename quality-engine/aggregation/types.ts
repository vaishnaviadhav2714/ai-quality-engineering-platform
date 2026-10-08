import { QualityIntelligence } from './intelligence';

export type QualityStatus = 'passed' | 'warning' | 'failed';

export interface AggregatedTestResult {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  durationMs: number;
  passRate: number;
}

export interface QualityMetric {
  area: 'automation' | 'security' | 'performance' | 'accessibility';

  tool: string;

  status: QualityStatus;

  summary: string;

  score?: number;
}

export interface QualitySnapshot {
  application: string;

  timestamp: string;

  metrics: QualityMetric[];

  overallStatus: QualityStatus;

  overallScore: number;

  intelligence?: QualityIntelligence;
}
