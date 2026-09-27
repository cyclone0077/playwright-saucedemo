import { test, expect } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();
});