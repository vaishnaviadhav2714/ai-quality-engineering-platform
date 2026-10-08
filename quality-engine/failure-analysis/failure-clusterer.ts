import { FailureCluster, TestFailure } from './types';

export function clusterFailures(failures: TestFailure[]): FailureCluster[] {
  const clusters = new Map<string, TestFailure[]>();

  for (const failure of failures) {
    const existingFailures = clusters.get(failure.signature) ?? [];

    existingFailures.push(failure);

    clusters.set(failure.signature, existingFailures);
  }

  return Array.from(clusters.entries()).map(([signature, clusteredFailures]) => ({
    signature,
    failures: clusteredFailures,
    failureCount: clusteredFailures.length,
  }));
}
