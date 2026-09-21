import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixtures';
import { SearchPage } from '../pages/search-page';
import { PRODUCT_TEST_DATA } from '../test-data/products';

test('User can search for a product', async ({ homePage, page }) => {
  await homePage.open();

  await homePage.searchBar.open();

  await homePage.searchBar.searchFor(PRODUCT_TEST_DATA.searchTerm);

  const searchPage = new SearchPage(page);

  await expect(searchPage.appleJuiceProduct).toBeVisible();
  await expect(searchPage.applePomaceProduct).toBeVisible();
});
