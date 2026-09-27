import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

if (!username || !password) {
  throw new Error('TEST_USERNAME and TEST_PASSWORD must be set in .env');
}

setup('authenticate as standard user', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: authFile });
});
