import { test, expect } from '@playwright/test';
import { buildQualitySignals } from './quality-signal-builder';

test.describe('buildQualitySignals', () => {
  test('should build all quality signals from aggregated test results', () => {
    const aggregatedResult = {
      total: 10,
      passed: 9,
      failed: 1,
      skipped: 0,
      durationMs: 5000,
      passRate: 90,
    };

    const signals = buildQualitySignals(aggregatedResult);

    expect(signals).toEqual([
      {
        name: 'pass-rate',
        value: 90,
      },
      {
        name: 'failure-rate',
        value: 10,
      },
      {
        name: 'skipped-rate',
        value: 0,
      },
      {
        name: 'test-duration-ms',
        value: 5000,
      },
      {
        name: 'average-test-duration-ms',
        value: 500,
      },
    ]);
  });

  test('should return zero rates when no tests were executed', () => {
    const aggregatedResult = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      durationMs: 0,
      passRate: 0,
    };

    const signals = buildQualitySignals(aggregatedResult);

    expect(signals).toEqual([
      {
        name: 'pass-rate',
        value: 0,
      },
      {
        name: 'failure-rate',
        value: 0,
      },
      {
        name: 'skipped-rate',
        value: 0,
      },
      {
        name: 'test-duration-ms',
        value: 0,
      },
      {
        name: 'average-test-duration-ms',
        value: 0,
      },
    ]);
  });
});
