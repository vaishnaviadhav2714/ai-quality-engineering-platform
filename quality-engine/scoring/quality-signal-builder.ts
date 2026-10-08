import { AggregatedTestResult } from '../aggregation/types';
import { QualitySignal } from '../types';

export function buildQualitySignals(result: AggregatedTestResult): QualitySignal[] {
  return [
    {
      name: 'pass-rate',
      value: result.passRate,
    },
    {
      name: 'failure-rate',
      value: result.total === 0 ? 0 : (result.failed / result.total) * 100,
    },
    {
      name: 'skipped-rate',
      value: result.total === 0 ? 0 : (result.skipped / result.total) * 100,
    },
    {
      name: 'test-duration-ms',
      value: result.durationMs,
    },
    {
      name: 'average-test-duration-ms',
      value: result.total === 0 ? 0 : result.durationMs / result.total,
    },
  ];
}
