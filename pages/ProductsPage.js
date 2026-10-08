class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsGrid = page.locator('.listing-products, .product-component-container');
    this.productNames = page.locator('.listing-products .product-name, .listing-products .product-title, .listing-products a');
  }

  async openCategory(categoryUrl) {
    await this.page.goto(categoryUrl, { waitUntil: 'networkidle' });
  }
}

module.exports = { ProductsPage };
