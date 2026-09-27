import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly firstItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByLabel('Sort products');
    this.firstItemName = page.getByTestId('inventory-item-name').first();
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async goToCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }
}