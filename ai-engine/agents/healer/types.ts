export interface HealingContext {
  testName: string;
  filePath: string;
  failureMessage: string;
  currentCode: string;
  errorDetails?: string;
}

export interface HealingProposal {
  changeType: 'locator' | 'assertion' | 'test-data' | 'unknown';
  explanation: string;
  proposedCode: string;
  confidence: 'high' | 'medium' | 'low';
  reviewStatus: 'pending' | 'approved' | 'rejected';
}
