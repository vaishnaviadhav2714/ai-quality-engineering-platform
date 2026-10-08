import { test, expect } from '@playwright/test';
import { runQualityEngine } from './quality-engine';

test.describe('runQualityEngine', () => {
  test('should process test results and return quality information', () => {
    const testResults = [
      {
        testName: 'login test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'search test',
        status: 'passed' as const,
        durationMs: 1500,
      },
      {
        testName: 'checkout test',
        status: 'failed' as const,
        durationMs: 2500,
      },
      {
        testName: 'logout test',
        status: 'skipped' as const,
        durationMs: 0,
      },
    ];

    const result = runQualityEngine(testResults);

    expect(result.aggregatedResult).toEqual({
      total: 4,
      passed: 2,
      failed: 1,
      skipped: 1,
      durationMs: 5000,
      passRate: 50,
    });

    expect(result.qualityScore.score).toBe(50);
    expect(result.qualityScore.passRate).toBe(50);

    expect(result.qualityGate).toEqual({
      passed: false,
      threshold: 80,
      score: 50,
    });
  });

  test('should pass the quality gate when the score meets the threshold', () => {
    const testResults = [
      {
        testName: 'login test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'search test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'checkout test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'logout test',
        status: 'passed' as const,
        durationMs: 1000,
      },
    ];

    const result = runQualityEngine(testResults);

    expect(result.qualityGate).toEqual({
      passed: true,
      threshold: 80,
      score: 100,
    });
  });

  test('should use a custom quality gate threshold', () => {
    const testResults = [
      {
        testName: 'login test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'search test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'checkout test',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'logout test',
        status: 'failed' as const,
        durationMs: 1000,
      },
    ];

    const result = runQualityEngine(testResults, 70);

    expect(result.qualityScore.score).toBe(75);

    expect(result.qualityGate).toEqual({
      passed: true,
      threshold: 70,
      score: 75,
    });
  });

  test('should pass when the score exactly meets the threshold', () => {
    const testResults = [
      {
        testName: 'test 1',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 2',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 3',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 4',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 5',
        status: 'failed' as const,
        durationMs: 1000,
      },
    ];

    const result = runQualityEngine(testResults);

    expect(result.qualityScore.score).toBe(80);

    expect(result.qualityGate).toEqual({
      passed: true,
      threshold: 80,
      score: 80,
    });
  });

  test('should fail when the score is below the threshold', () => {
    const testResults = [
      {
        testName: 'test 1',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 2',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 3',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 4',
        status: 'failed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 5',
        status: 'failed' as const,
        durationMs: 1000,
      },
    ];

    const result = runQualityEngine(testResults);

    expect(result.qualityScore.score).toBe(60);

    expect(result.qualityGate).toEqual({
      passed: false,
      threshold: 80,
      score: 60,
    });
  });

  test('should fail when a custom threshold is higher than the score', () => {
    const testResults = [
      {
        testName: 'test 1',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 2',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 3',
        status: 'passed' as const,
        durationMs: 1000,
      },
      {
        testName: 'test 4',
        status: 'failed' as const,
        durationMs: 1000,
      },
    ];

    const result = runQualityEngine(testResults, 90);

    expect(result.qualityScore.score).toBe(75);

    expect(result.qualityGate).toEqual({
      passed: false,
      threshold: 90,
      score: 75,
    });
  });
});
