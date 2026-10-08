import { test, expect } from '@playwright/test';
import { calculateQualityScore } from './quality-score-calculator';

test.describe('calculateQualityScore', () => {
  test('should calculate quality score from pass rate', () => {
    const aggregatedResult = {
      total: 10,
      passed: 9,
      failed: 1,
      skipped: 0,
      durationMs: 5000,
      passRate: 90,
    };

    const qualityScore = calculateQualityScore(aggregatedResult);

    expect(qualityScore).toEqual({
      score: 90,
      passRate: 90,
      signals: [
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
      ],
    });
  });

  test('should return zero score when pass rate is zero', () => {
    const aggregatedResult = {
      total: 10,
      passed: 0,
      failed: 10,
      skipped: 0,
      durationMs: 5000,
      passRate: 0,
    };

    const qualityScore = calculateQualityScore(aggregatedResult);

    expect(qualityScore).toEqual({
      score: 0,
      passRate: 0,
      signals: [
        {
          name: 'pass-rate',
          value: 0,
        },
        {
          name: 'failure-rate',
          value: 100,
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
      ],
    });
  });

  test('should return zero signals when no tests were executed', () => {
    const aggregatedResult = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      durationMs: 0,
      passRate: 0,
    };

    const qualityScore = calculateQualityScore(aggregatedResult);

    expect(qualityScore).toEqual({
      score: 0,
      passRate: 0,
      signals: [
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
      ],
    });
  });
  test('should reject invalid quality input', () => {
    const aggregatedResult = {
      total: 10,
      passed: 8,
      failed: 1,
      skipped: 0,
      durationMs: 5000,
      passRate: 80,
    };

    expect(() => calculateQualityScore(aggregatedResult)).toThrow(
      'Passed, failed, and skipped counts must equal total tests',
    );
  });
});
