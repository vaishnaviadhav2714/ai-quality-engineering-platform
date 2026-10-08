import { QualitySignal } from '../types';

export interface QualityScore {
  score: number;
  passRate: number;
  signals?: QualitySignal[];
}
