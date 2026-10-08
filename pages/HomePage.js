const baseUrl = process.env.BASE_URL || 'https://www.greenmarknatural.com';

class HomePage {
  constructor(page) {
    this.page = page;
    this.homeMenu = page.locator('a[href="/"], .logo-wrapper a, [class*="logo"]');
    this.categoriesMenu = page.locator('text=Categories').first();
    this.productsMenu = page.locator('text=/products/i').first();
    this.galleryMenu = page.locator('text=/gallery/i').first();
    this.searchInput = page.locator('#srchtxtsticky, input[placeholder="Search"]');
    this.searchButton = page.locator('button.search-button, button:has-text("Search")').first();
    this.cartButton = page.locator('#crt-btn-onscroll');
  }

  async open() {
    await this.page.goto(baseUrl, { waitUntil: 'networkidle' });
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async gotoSearchResults(productName) {
    const city = encodeURIComponent(process.env.CITY || 'Thrissur');
    const searchUrl = `${baseUrl}/search?srchval=${encodeURIComponent(productName)}&city=${city}`;
    await this.page.goto(searchUrl, { waitUntil: 'networkidle' });
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();

    const currentUrl = this.page.url();
    if (!currentUrl.includes('/search?')) {
      await this.gotoSearchResults(productName);
    }
  }

  async clickCart() {
    await this.cartButton.click();
    if (!this.page.url().includes('/cart')) {
      await this.page.goto(`${baseUrl}/cart`, { waitUntil: 'networkidle' });
    }
  }
}

module.exports = { HomePage };
