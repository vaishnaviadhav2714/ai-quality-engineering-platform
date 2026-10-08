import { test, expect } from '@playwright/test';
import { evaluateQualityGate } from '../../quality-engine/scoring/quality-gate';

test.describe('evaluateQualityGate', () => {
  test('should pass when quality score meets the threshold', () => {
    const qualityScore = {
      score: 90,
      passRate: 90,
    };

    const result = evaluateQualityGate(qualityScore);

    expect(result).toEqual({
      passed: true,
      threshold: 80,
      score: 90,
    });
  });

  test('should fail when quality score is below the threshold', () => {
    const qualityScore = {
      score: 70,
      passRate: 70,
    };

    const result = evaluateQualityGate(qualityScore);

    expect(result).toEqual({
      passed: false,
      threshold: 80,
      score: 70,
    });
  });

  test('should use a custom threshold when provided', () => {
    const qualityScore = {
      score: 85,
      passRate: 85,
    };

    const result = evaluateQualityGate(qualityScore, 90);

    expect(result).toEqual({
      passed: false,
      threshold: 90,
      score: 85,
    });
  });
});
