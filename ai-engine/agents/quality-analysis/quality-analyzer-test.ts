import { OllamaProvider } from '../../providers/ollama/ollama-provider';
import { QualityEvidence } from './types';
import { QualityAnalyzer } from './quality-analyzer';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const analyzer = new QualityAnalyzer(provider);

  const evidence: QualityEvidence = {
    area: 'accessibility',
    tool: 'axe-core',
    summary:
      'Accessibility scan completed on the Juice Shop home page. One critical accessibility violation was detected.',
    findings: [
      'Critical violation: form element does not have an associated label',
      'Affected element: text input field',
      'axe-core rule: label',
      'Impact: critical',
    ],
  };

  const analysis = await analyzer.analyze(evidence);

  console.log('AI Quality Analysis:');
  console.log(JSON.stringify(analysis, null, 2));
}

main().catch((error: unknown) => {
  console.error('Quality Analyzer failed:', error);
  process.exit(1);
});
