import { test, expect } from '@playwright/test';
import { aggregateTestResults } from '../../quality-engine/aggregation/test-result-aggregator';

test.describe('aggregateTestResults', () => {
  test('should calculate test execution metrics correctly', () => {
    const results = [
      { testName: 'login test', status: 'passed' as const, durationMs: 1000 },
      { testName: 'search test', status: 'passed' as const, durationMs: 2000 },
      { testName: 'checkout test', status: 'failed' as const, durationMs: 1500 },
      { testName: 'logout test', status: 'skipped' as const, durationMs: 500 },
    ];

    const summary = aggregateTestResults(results);

    expect(summary).toEqual({
      total: 4,
      passed: 2,
      failed: 1,
      skipped: 1,
      durationMs: 5000,
      passRate: 50,
    });
  });
});
