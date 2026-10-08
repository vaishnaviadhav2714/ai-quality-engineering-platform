export interface TestExecutionResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  durationMs: number;
}
