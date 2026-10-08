import { TestPlanner } from './test-planner';
import { AIProvider } from '../../providers/ai-provider';
import { RequirementAnalysis } from '../requirement-analyst/types';

class MockAIProvider implements AIProvider {
  async generate(): Promise<string> {
    return JSON.stringify({
      scenarios: [],
      apiCoverage: [],
      uiCoverage: [],
      securityNeeds: [],
      performanceNeeds: [],
    });
  }
}

async function main(): Promise<void> {
  const provider = new MockAIProvider();
  const testPlanner = new TestPlanner(provider);

  const requirements: RequirementAnalysis = {
    functionalRequirements: ['Users should be able to log in using their email and password.'],
    edgeCases: [],
    risks: [],
    missingRequirements: [],
  };

  try {
    await testPlanner.plan(requirements);

    throw new Error('Test failed: empty test plan was accepted.');
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Test failed: empty test plan was accepted.') {
      throw error;
    }

    console.log('Empty test plan was correctly rejected.');
  }
}

main().catch((error: unknown) => {
  console.error('Empty test plan validation failed:', error);
  process.exit(1);
});
