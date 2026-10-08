export interface GeneratedTest {
  title: string;
  type: 'web' | 'api';
  description: string;
  sourceScenario: string;
  code: string;
}

export interface GeneratedTestPlan {
  tests: GeneratedTest[];
}
