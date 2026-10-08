import { AggregatedTestResult } from '../aggregation/types';
import { QualityScore } from './types';
import { buildQualitySignals } from './quality-signal-builder';
import { validateQualityInput } from './quality-input-validator';

export function calculateQualityScore(result: AggregatedTestResult): QualityScore {
  validateQualityInput(result);

  return {
    score: result.passRate,
    passRate: result.passRate,
    signals: buildQualitySignals(result),
  };
}
