export interface FailureContext {
  testName: string;
  testType: 'web' | 'api';
  area: string;
  failureMessage: string;
  expected?: string;
  actual?: string;
  errorDetails?: string;
}

export interface FailureInvestigation {
  category: 'application' | 'test' | 'environment' | 'data' | 'network' | 'unknown';
  likelyCause: string;
  confidence: 'high' | 'medium' | 'low';
  recommendedAction: string;
  evidenceSummary: string;
}
