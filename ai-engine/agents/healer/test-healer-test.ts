import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { TestHealer } from './test-healer';
import { HealingContext } from './types';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const healer = new TestHealer(provider);

  const healingContext: HealingContext = {
    testName: 'Valid Login Scenario',
    filePath: 'automation/web/tests/login.spec.ts',
    failureMessage: 'Locator not found: getByRole("button", { name: "Login" })',
    currentCode: 'await page.getByRole("button", { name: "Login" }).click();',
    errorDetails: 'Playwright could not find the expected Login button on the page.',
  };

  const proposal = await healer.proposeHealing(healingContext);

  console.log('AI Test Healing Proposal:');
  console.log(JSON.stringify(proposal, null, 2));
}

main().catch((error: unknown) => {
  console.error('Test Healer failed:', error);
  process.exit(1);
});
