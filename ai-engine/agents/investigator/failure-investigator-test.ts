import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { FailureInvestigator } from './failure-investigator';
import { FailureContext } from './types';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const investigator = new FailureInvestigator(provider);

  const failureContext: FailureContext = {
    testName: 'Valid Login Scenario',
    testType: 'web',
    area: 'Authentication',
    failureMessage: 'Expected dashboard URL, but the application remained on the login page.',
    expected: 'URL should contain /dashboard',
    actual: 'URL remained /login',
    errorDetails: 'Playwright URL assertion failed after clicking the login button.',
  };

  const investigation = await investigator.investigate(failureContext);

  console.log('AI Failure Investigation:');
  console.log(JSON.stringify(investigation, null, 2));
}

main().catch((error: unknown) => {
  console.error('Failure Investigator failed:', error);
  process.exit(1);
});
