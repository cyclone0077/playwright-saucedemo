import { test, expect } from '../fixtures/index';

test('cart page shows the added product', async ({ productsPage, cartPage }) => {
  await productsPage.addToCart('sauce-labs-backpack');
  await productsPage.goToCart();

  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.itemName).toHaveText('Sauce Labs Backpack');
});

test('sorting by price low to high shows cheapest first', async ({ productsPage }) => {
  await productsPage.sortBy('lohi');

  await expect(productsPage.firstItemName).toHaveText('Sauce Labs Onesie');
});