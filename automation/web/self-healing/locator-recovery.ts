import { Locator } from '@playwright/test';

export async function clickWithRecovery(
  primaryLocator: Locator,
  fallbackLocator: Locator,
): Promise<void> {
  try {
    await primaryLocator.click({ timeout: 10_000 });
    return;
  } catch {
    console.log('Primary locator failed. Trying fallback locator.');
    await fallbackLocator.click();
  }
}
