import { test, expect } from '@playwright/test';
import { validateQualityInput } from './quality-input-validator';

test.describe('validateQualityInput', () => {
  test('should accept valid quality input', () => {
    const aggregatedResult = {
      total: 10,
      passed: 9,
      failed: 1,
      skipped: 0,
      durationMs: 5000,
      passRate: 90,
    };

    expect(() => validateQualityInput(aggregatedResult)).not.toThrow();
  });

  test('should reject negative total test count', () => {
    const aggregatedResult = {
      total: -1,
      passed: 0,
      failed: 0,
      skipped: 0,
      durationMs: 0,
      passRate: 0,
    };

    expect(() => validateQualityInput(aggregatedResult)).toThrow(
      'Total test count cannot be negative',
    );
  });

  test('should reject inconsistent test counts', () => {
    const aggregatedResult = {
      total: 10,
      passed: 8,
      failed: 1,
      skipped: 0,
      durationMs: 5000,
      passRate: 80,
    };

    expect(() => validateQualityInput(aggregatedResult)).toThrow(
      'Passed, failed, and skipped counts must equal total tests',
    );
  });

  test('should reject pass rate above 100', () => {
    const aggregatedResult = {
      total: 10,
      passed: 10,
      failed: 0,
      skipped: 0,
      durationMs: 5000,
      passRate: 120,
    };

    expect(() => validateQualityInput(aggregatedResult)).toThrow(
      'Pass rate must be between 0 and 100',
    );
  });
});
