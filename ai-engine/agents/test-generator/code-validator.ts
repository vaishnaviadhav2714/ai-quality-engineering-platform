export function validateGeneratedTestCode(code: string): void {
  if (!code.includes('import { test')) {
    throw new Error('Generated test must import Playwright test.');
  }

  if (!code.includes('test(')) {
    throw new Error('Generated test must contain a Playwright test block.');
  }

  if (code.includes('page.assert(')) {
    throw new Error('Generated test contains invalid Playwright API: page.assert().');
  }
}
