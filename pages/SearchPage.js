class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchResults = page.locator('.listing-products, .product-component-container');
    this.sortByDropdown = page.locator('.dropdown-div .Iysz_ripple');
    this.sortMenuOptions = page.locator('.dropdown-div li .l50f_item-text, .dropdown-div .bZrx_list-item .l50f_item-text');
    this.resultCards = page.locator('.listing-products .product-name, .listing-products a, .listing-products .product-title');
  }

  async openSearchResults(productName) {
    const city = encodeURIComponent(process.env.CITY || 'Thrissur');
    const baseUrl = process.env.BASE_URL || 'https://www.greenmarknatural.com';
    await this.page.goto(`${baseUrl}/search?srchval=${encodeURIComponent(productName)}&city=${city}`, { waitUntil: 'networkidle' });
  }

  async getSortOptions() {
    await this.sortByDropdown.first().click();
    return (await this.sortMenuOptions.allTextContents()).map((item) => item.trim()).filter(Boolean);
  }
}

module.exports = { SearchPage };
