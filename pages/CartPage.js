class CartPage {
  constructor(page) {
    this.page = page;
    this.cartButton = page.locator('#crt-btn-onscroll');
    this.cartSummary = page.locator('body');
  }

  async open() {
    const baseUrl = process.env.BASE_URL || 'https://www.greenmarknatural.com';
    await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'networkidle' });
  }

  async clickCart() {
    await this.cartButton.click();
    if (!this.page.url().includes('/cart')) {
      const baseUrl = process.env.BASE_URL || 'https://www.greenmarknatural.com';
      await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'networkidle' });
    }
  }
}

module.exports = { CartPage };
