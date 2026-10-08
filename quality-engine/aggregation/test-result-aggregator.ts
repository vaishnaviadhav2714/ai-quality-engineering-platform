import { AggregatedTestResult } from './types';
import { TestExecutionResult } from './execution-result';

export function aggregateTestResults(results: TestExecutionResult[]): AggregatedTestResult {
  const total = results.length;

  const passed = results.filter((result) => result.status === 'passed').length;

  const failed = results.filter((result) => result.status === 'failed').length;

  const skipped = results.filter((result) => result.status === 'skipped').length;

  const durationMs = results.reduce(
    (totalDuration, result) => totalDuration + result.durationMs,
    0,
  );

  const passRate = total === 0 ? 0 : (passed / total) * 100;

  return {
    total,
    passed,
    failed,
    skipped,
    durationMs,
    passRate,
  };
}
