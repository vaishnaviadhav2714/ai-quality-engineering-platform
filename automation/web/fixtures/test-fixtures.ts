import { test as base } from '@playwright/test';
import { AccountMenu } from '../components/account-menu';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

type TestFixtures = {
  homePage: HomePage;
  accountMenu: AccountMenu;
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  accountMenu: async ({ page }, use) => {
    await use(new AccountMenu(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
