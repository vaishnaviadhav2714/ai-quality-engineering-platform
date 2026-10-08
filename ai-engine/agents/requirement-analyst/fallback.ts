import { RequirementAnalysis, RequirementInput } from './types';

export function createRequirementAnalysisFallback(input: RequirementInput): RequirementAnalysis {
  return {
    functionalRequirements: [input.requirement],
    edgeCases: [],
    risks: [],
    missingRequirements: [
      'Additional requirements could not be analyzed because AI analysis was unavailable.',
    ],
  };
}
