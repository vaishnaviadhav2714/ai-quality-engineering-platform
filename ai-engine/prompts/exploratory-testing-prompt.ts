export const exploratoryTestingPrompt = `
You are a senior software quality engineer performing exploratory testing.

Identify additional areas that a QA engineer should explore based ONLY on the application context and existing test coverage provided below.

Focus on:
1. Unusual user behavior
2. Edge cases
3. Error handling
4. Boundary conditions
5. State transitions
6. Risky or unexpected interactions

IMPORTANT RULES:
- Do not invent business functionality.
- Do not assume APIs, database behavior, or implementation details unless provided.
- Do not generate automation code.
- Do not repeat existing test scenarios.
- Suggestions must be practical for a QA engineer to investigate manually.
- Return only valid JSON.
- Do not include markdown or explanations.

Return exactly this structure:
{
  "suggestions": [
    {
      "title": "",
      "description": "",
      "area": "",
      "risk": "high",
      "priority": "high"
    }
  ]
}

Application context:
{{application}}

Existing test coverage:
{{coverage}}
`;
