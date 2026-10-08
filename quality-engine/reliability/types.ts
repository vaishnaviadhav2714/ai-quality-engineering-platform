export interface TestReliability {
  testName: string;
  totalRuns: number;
  passedRuns: number;
  failedRuns: number;
  reliabilityScore: number;
  isFlaky: boolean;
}
