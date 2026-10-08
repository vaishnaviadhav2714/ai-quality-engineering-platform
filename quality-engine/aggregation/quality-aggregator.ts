import { QualityMetric, QualitySnapshot } from './types';

import { qualitySnapshotSchema } from './validation';

export class QualityAggregator {
  aggregate(application: string, metrics: QualityMetric[]): QualitySnapshot {
    const hasFailure = metrics.some((metric) => metric.status === 'failed');

    const hasWarning = metrics.some((metric) => metric.status === 'warning');

    const overallStatus = hasFailure ? 'failed' : hasWarning ? 'warning' : 'passed';

    const metricsWithScores = metrics.map((metric) => ({
      ...metric,
      score:
        metric.score ?? (metric.status === 'passed' ? 100 : metric.status === 'warning' ? 70 : 0),
    }));

    const overallScore =
      metricsWithScores.length === 0
        ? 0
        : Math.round(
            metricsWithScores.reduce((total, metric) => total + (metric.score ?? 0), 0) /
              metricsWithScores.length,
          );

    const snapshot: QualitySnapshot = {
      application,
      timestamp: new Date().toISOString(),
      metrics: metricsWithScores,
      overallStatus,
      overallScore,
    };

    return qualitySnapshotSchema.parse(snapshot);
  }
}
