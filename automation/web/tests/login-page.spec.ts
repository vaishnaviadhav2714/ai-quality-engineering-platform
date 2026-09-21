import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixtures';
import { TEST_USER } from '../test-data/users';

test('User can log in successfully', async ({ homePage, accountMenu, loginPage, page }) => {
  await homePage.open();

  await accountMenu.open();

  await accountMenu.goToLogin();

  await loginPage.login(TEST_USER.email, TEST_USER.password);

  await expect(page).toHaveURL(/#\/search/);
});

test('User can log out successfully', async ({ homePage, accountMenu, loginPage, page }) => {
  await homePage.open();

  await accountMenu.open();

  await accountMenu.goToLogin();

  await loginPage.login(TEST_USER.email, TEST_USER.password);

  await accountMenu.open();

  await accountMenu.logout();

  await expect(page).toHaveURL(/#\/$/);
});
