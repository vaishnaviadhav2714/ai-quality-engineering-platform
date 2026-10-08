import { QualityAggregator } from './quality-aggregator';
import { QualityMetric } from './types';

function main(): void {
  const aggregator = new QualityAggregator();

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

  const snapshot = aggregator.aggregate('OWASP Juice Shop', metrics);

  console.log('Quality Snapshot:');
  console.log(JSON.stringify(snapshot, null, 2));
}

main();
