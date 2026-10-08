export interface RequirementInput {
  requirement: string;
  source?: string;
  context?: string;
}

export interface RequirementAnalysis {
  functionalRequirements: string[];
  edgeCases: string[];
  risks: string[];
  missingRequirements: string[];
}
