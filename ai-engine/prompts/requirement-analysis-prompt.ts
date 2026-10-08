export const requirementAnalysisPrompt = `
You are a software quality engineering requirement analyst.

Analyze the provided software requirement from a QA perspective.

Identify:
1. Functional requirements
2. Edge cases
3. Potential risks
4. Missing or unclear requirements

Do not invent business requirements that are not supported by the input.

Return the analysis in JSON format with exactly these fields:
{
  "functionalRequirements": [],
  "edgeCases": [],
  "risks": [],
  "missingRequirements": []
}

Requirement:
{{requirement}}

Additional context:
{{context}}
`;
