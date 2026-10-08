import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { TestGenerator } from './test-generator';
import { TestPlan } from '../test-planner/types';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const generator = new TestGenerator(provider);

  const testPlan: TestPlan = {
    scenarios: [
      {
        title: 'Valid Login Scenario',
        description: 'User successfully logs in with a valid email and password.',
        type: 'positive',
        priority: 'high',
      },
    ],
    apiCoverage: [],
    uiCoverage: [
      {
        uiElement: 'Login Form',
        description: 'User enters email and password to attempt login.',
      },
    ],
    securityNeeds: [],
    performanceNeeds: [],
  };

  const generatedTestPlan = await generator.generate(testPlan);

  console.log('AI Generated Test Plan:');
  console.log(JSON.stringify(generatedTestPlan, null, 2));
}

main().catch((error: unknown) => {
  console.error('Test Generator failed:', error);
  process.exit(1);
});
