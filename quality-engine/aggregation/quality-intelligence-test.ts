import { QualityAnalyzer } from '../../ai-engine/agents/quality-analysis/quality-analyzer';
import { OllamaProvider } from '../../ai-engine/providers/ollama/ollama-provider';
import { QualityAggregator } from './quality-aggregator';
import { QualityEvidence } from '../../ai-engine/agents/quality-analysis/types';
import { QualityIntelligenceService } from './quality-intelligence';
import { QualityMetric } from './types';

async function main(): Promise<void> {
  const provider = new OllamaProvider();

  const analyzer = new QualityAnalyzer(provider);

  const aggregator = new QualityAggregator();

  const service = new QualityIntelligenceService(aggregator, analyzer);

  const metrics: QualityMetric[] = [
    {
      area: 'automation',
      tool: 'Playwright',
      status: 'passed',
      summary: 'All automated tests passed.',
      score: 100,
    },
    {
      area: 'security',
      tool: 'OWASP ZAP',
      status: 'warning',
      summary: '8 warning-level findings detected.',
    },
    {
      area: 'performance',
      tool: 'k6',
      status: 'passed',
      summary: '0% HTTP request failures.',
      score: 95,
    },
    {
      area: 'accessibility',
      tool: 'axe-core',
      status: 'failed',
      summary: 'One critical accessibility violation detected.',
    },
  ];

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

  const snapshot = await service.buildSnapshot('OWASP Juice Shop', metrics, evidence);

  console.log('AI Quality Intelligence Snapshot:');
  console.log(JSON.stringify(snapshot, null, 2));
}

main().catch((error: unknown) => {
  console.error('Quality Intelligence test failed:', error);
  process.exit(1);
});
