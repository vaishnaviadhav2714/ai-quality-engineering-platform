import { AIProvider } from '../../providers/ai-provider';
import { testPlanningPrompt } from '../../prompts/test-planning-prompt';
import { RequirementAnalysis } from '../requirement-analyst/types';
import { TestPlan } from './types';
import { testPlanSchema } from './validation';

export class TestPlanner {
  constructor(private readonly provider: AIProvider) {}

  async plan(requirements: RequirementAnalysis): Promise<TestPlan> {
    const prompt = testPlanningPrompt.replace(
      '{{requirements}}',
      JSON.stringify(requirements, null, 2),
    );

    const response = await this.provider.generate(prompt);

    console.log('\nRaw Test Planner Response:');
    console.log(response);

    const parsedResponse: unknown = JSON.parse(response);
    return testPlanSchema.parse(parsedResponse);
  }
}
