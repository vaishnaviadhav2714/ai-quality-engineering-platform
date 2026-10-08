export interface TestFailure {
  testName: string;
  errorMessage: string;
  category: 'api' | 'ui' | 'timeout' | 'assertion' | 'unknown';
  signature: string;
}

export interface FailureCluster {
  signature: string;
  failures: TestFailure[];
  failureCount: number;
}
