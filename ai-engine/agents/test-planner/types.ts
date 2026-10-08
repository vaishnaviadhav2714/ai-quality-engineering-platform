export interface TestScenario {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'edge';
  priority: 'high' | 'medium' | 'low';
}

export interface ApiCoverage {
  api: string;
  endpoint: string;
  method: string;
  parameters?: Record<string, string>;
}

export interface UiCoverage {
  uiElement: string;
  description: string;
}

export interface SecurityNeed {
  need: string;
  description: string;
}

export interface PerformanceNeed {
  need: string;
  description: string;
}

export interface TestPlan {
  scenarios: TestScenario[];
  apiCoverage: ApiCoverage[];
  uiCoverage: UiCoverage[];
  securityNeeds: SecurityNeed[];
  performanceNeeds: PerformanceNeed[];
}
