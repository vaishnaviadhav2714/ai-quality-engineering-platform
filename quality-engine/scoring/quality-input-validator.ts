import { AggregatedTestResult } from '../aggregation/types';

export function validateQualityInput(result: AggregatedTestResult): void {
  if (result.total < 0) {
    throw new Error('Total test count cannot be negative');
  }

  if (result.passed < 0) {
    throw new Error('Passed test count cannot be negative');
  }

  if (result.failed < 0) {
    throw new Error('Failed test count cannot be negative');
  }

  if (result.skipped < 0) {
    throw new Error('Skipped test count cannot be negative');
  }

  if (result.passed + result.failed + result.skipped !== result.total) {
    throw new Error('Passed, failed, and skipped counts must equal total tests');
  }

  if (result.passRate < 0 || result.passRate > 100) {
    throw new Error('Pass rate must be between 0 and 100');
  }
}
