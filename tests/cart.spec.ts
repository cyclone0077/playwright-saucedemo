import { test, expect } from '../fixtures/index';

test.describe('Shopping Cart', () => {
  test('user can add a product to the cart', async ({ productsPage }) => {
   await productsPage.addToCart('sauce-labs-backpack');

   await expect(productsPage.cartBadge).toHaveText('1');
 });

  test('cart badge updates when two products are added @smoke', async ({ cartPage, productsPage }) => {
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.addToCart('sauce-labs-bike-light');

    await expect(productsPage.cartBadge).toHaveText('2');
 });

  test('user can remove a product from the cart @smoke', async ({ cartPage, productsPage }) => {
   await productsPage.addToCart('sauce-labs-backpack');
   await productsPage.goToCart();
   await cartPage.removeItem('sauce-labs-backpack');

   await expect(productsPage.cartBadge).toBeHidden()  ;
 });

});

