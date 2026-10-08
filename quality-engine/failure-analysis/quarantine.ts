export interface QuarantineRecord {
  testName: string;
  isQuarantined: boolean;
  reason: string;
}

export function quarantineTest(testName: string, reason: string): QuarantineRecord {
  return {
    testName,
    isQuarantined: true,
    reason,
  };
}

export function releaseFromQuarantine(testName: string): QuarantineRecord {
  return {
    testName,
    isQuarantined: false,
    reason: '',
  };
}
