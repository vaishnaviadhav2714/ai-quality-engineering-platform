import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { RequirementAnalyst } from '../requirement-analyst/requirement-analyst';
import { TestPlanner } from './test-planner';
import { createPendingReview } from './reviewer';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const requirementAnalyst = new RequirementAnalyst(provider);

  const testPlanner = new TestPlanner(provider);

  const requirementAnalysis = await requirementAnalyst.analyze({
    requirement: 'Users should be able to log in using their email and password.',
    source: 'Test Planner Example',
    context: 'Web application login feature',
  });

  console.log('Requirement Analysis:');
  console.log(JSON.stringify(requirementAnalysis, null, 2));

  const testPlan = await testPlanner.plan(requirementAnalysis);

  console.log('\nGenerated Test Plan:');
  console.log(JSON.stringify(testPlan, null, 2));

  const review = createPendingReview(testPlan);

  console.log('\nHuman Review:');
  console.log(JSON.stringify(review, null, 2));
}

main().catch((error: unknown) => {
  console.error('Test Planner failed:', error);
  process.exit(1);
});
