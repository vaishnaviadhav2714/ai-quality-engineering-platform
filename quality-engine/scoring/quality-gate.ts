import { QualityScore } from './types';

export interface QualityGateResult {
  passed: boolean;
  threshold: number;
  score: number;
}

export function evaluateQualityGate(qualityScore: QualityScore, threshold = 80): QualityGateResult {
  return {
    passed: qualityScore.score >= threshold,
    threshold,
    score: qualityScore.score,
  };
}
