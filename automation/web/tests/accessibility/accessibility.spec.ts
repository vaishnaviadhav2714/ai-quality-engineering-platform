import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Juice Shop home page should have no critical accessibility violations', async ({
    page,
  }) => {
    test.setTimeout(120000);

    await page.goto('http://localhost:3000');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.impact === 'critical',
    );

    expect(criticalViolations).toEqual([]);
  });
});
