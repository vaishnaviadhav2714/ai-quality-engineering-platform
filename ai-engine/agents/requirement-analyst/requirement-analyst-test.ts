import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { RequirementAnalyst } from './requirement-analyst';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const analyst = new RequirementAnalyst(provider);

  const result = await analyst.analyze({
    requirement: 'Users should be able to log in using their email and password.',
    source: 'AI Requirement Test',
    context: 'Web application login feature',
  });

  console.log('AI Requirement Analysis Result:');
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error: unknown) => {
  console.error('Requirement Analyst test failed:', error);
  process.exit(1);
});
