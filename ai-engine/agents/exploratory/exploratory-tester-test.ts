import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { ExploratoryTester } from './exploratory-tester';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const exploratoryTester = new ExploratoryTester(provider);

  const application = 'OWASP Juice Shop running at http://localhost:3000';

  const coverage = `
Existing automated coverage:
- User login
- Product search
- Product details
- Add product to cart
- Cart validation
- Checkout flow
`;

  const exploratoryPlan = await exploratoryTester.explore(application, coverage);

  console.log('AI Exploratory Test Plan:');
  console.log(JSON.stringify(exploratoryPlan, null, 2));
}

main().catch((error: unknown) => {
  console.error('Exploratory Tester failed:', error);
  process.exit(1);
});
