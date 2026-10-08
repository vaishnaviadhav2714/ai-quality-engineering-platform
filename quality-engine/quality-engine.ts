import { aggregateTestResults } from './aggregation/test-result-aggregator';
import { TestExecutionResult } from './aggregation/execution-result';
import { calculateQualityScore } from './scoring/quality-score-calculator';
import { evaluateQualityGate, QualityGateResult } from './scoring/quality-gate';

export interface QualityEngineResult {
  aggregatedResult: ReturnType<typeof aggregateTestResults>;
  qualityScore: ReturnType<typeof calculateQualityScore>;
  qualityGate: QualityGateResult;
}

export function runQualityEngine(
  testResults: TestExecutionResult[],
  qualityGateThreshold = 80,
): QualityEngineResult {
  const aggregatedResult = aggregateTestResults(testResults);

  const qualityScore = calculateQualityScore(aggregatedResult);

  const qualityGate = evaluateQualityGate(qualityScore, qualityGateThreshold);

  return {
    aggregatedResult,
    qualityScore,
    qualityGate,
  };
}
