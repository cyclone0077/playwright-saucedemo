import { test as base, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

type MyFixtures = {
  productsPage: ProductsPage;
  cartPage: CartPage;
};

export const test = base.extend<MyFixtures>({
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { expect };