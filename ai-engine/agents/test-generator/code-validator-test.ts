import { validateGeneratedTestCode } from './code-validator';

function main(): void {
  const validCode = `
import { test } from '@playwright/test';

test('Valid Login Scenario', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button').click();
});
`;

  const invalidCode = `
import { test } from '@playwright/test';

test('Invalid Test', async ({ page }) => {
  await page.assert(page.locator('h1'));
});
`;

  validateGeneratedTestCode(validCode);

  console.log('Valid Playwright code was accepted.');

  try {
    validateGeneratedTestCode(invalidCode);

    throw new Error('Test failed: invalid Playwright code was accepted.');
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === 'Test failed: invalid Playwright code was accepted.'
    ) {
      throw error;
    }

    console.log('Invalid Playwright code was correctly rejected.');
  }
}

main();
