import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixtures';

test('Homepage loads successfully', async ({ homePage }) => {
  await homePage.open();

  await expect(homePage.pageHeading).toBeVisible();
  await expect(homePage.searchBar.searchButton).toBeVisible();
});
