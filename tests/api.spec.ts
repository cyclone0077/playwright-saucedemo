import { test, expect } from '@playwright/test';

test('products API returns a list', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/products');

  expect(response.status()).toBe(200);

  const body = await response.json();
  //console.log(body.products[0]);   // print the first product
  expect(body.products.length).toBeGreaterThan(0);
});

test('login API returns a token', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.accessToken).toBeDefined();
  //console.log(body.accessToken);
  expect(body.username).toBe('emilys');
  expect(body.email).toBeDefined();
});

test('mock intercepts browser request', async ({ page }) => {
  await page.route('https://dummyjson.com/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        products: [{ id: 1, title: 'Mocked Product', price: 5.99 }],
        total: 1,
      }),
    });
  });

  // fire the request FROM the browser context
  const result = await page.evaluate(async () => {
    const res = await fetch('https://dummyjson.com/products');
    return res.json();
  });
  //console.log(result.products[0].title);
  expect(result.products[0].title).toBe('Mocked Product');
});
