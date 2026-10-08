import { AIProvider } from '../../providers/ai-provider';
import { testGenerationPrompt } from '../../prompts/test-generation-prompt';
import { TestPlan } from '../test-planner/types';
import { GeneratedTestPlan } from './types';
import { generatedTestPlanSchema } from './validation';
import { validateGeneratedTestCode } from './code-validator';

export class TestGenerator {
  constructor(private readonly provider: AIProvider) {}

  async generate(testPlan: TestPlan): Promise<GeneratedTestPlan> {
    const prompt = testGenerationPrompt
      .replace('{{scenario}}', JSON.stringify(testPlan.scenarios, null, 2))
      .replace('{{application}}', 'OWASP Juice Shop running at http://localhost:3000');

    const response = await this.provider.generate(prompt);

    const parsedResponse: unknown = JSON.parse(response);

    const generatedTestPlan = generatedTestPlanSchema.parse(parsedResponse);

    const enrichedTestPlan: GeneratedTestPlan = {
      tests: generatedTestPlan.tests.map((test) => ({
        ...test,
        sourceScenario: test.sourceScenario,
      })),
    };

    for (const test of enrichedTestPlan.tests) {
      validateGeneratedTestCode(test.code);
    }

    return enrichedTestPlan;
  }
}
