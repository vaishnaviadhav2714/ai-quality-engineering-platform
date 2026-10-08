import { TestReliability } from './types';

export interface TestExecutionHistory {
  testName: string;
  status: 'passed' | 'failed';
}

export function calculateTestReliability(history: TestExecutionHistory[]): TestReliability {
  const totalRuns = history.length;

  const passedRuns = history.filter((execution) => execution.status === 'passed').length;

  const failedRuns = history.filter((execution) => execution.status === 'failed').length;

  const reliabilityScore = totalRuns === 0 ? 0 : (passedRuns / totalRuns) * 100;

  const isFlaky = reliabilityScore < 80;

  return {
    testName: history[0]?.testName ?? 'Unknown Test',
    totalRuns,
    passedRuns,
    failedRuns,
    reliabilityScore,
    isFlaky,
  };
}
