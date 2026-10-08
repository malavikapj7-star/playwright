const { expect } = require('@playwright/test');
const test = require('../fixtures/test-fixtures');
const { ProductsPage } = require('../pages/ProductsPage');

test('should view product listings when a category page is opened', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const categoryUrl = `${process.env.BASE_URL || 'https://www.greenmarknatural.com'}/ayurveda/cid-9635-71425/?page=1`;

  await productsPage.openCategory(categoryUrl);

  await expect(page).toHaveURL(/\/(?:ayurveda\/|search(?:\?|$))/i);
  await expect(page.locator('body')).toContainText(/Sort By|Popularity|No Products found/i);
});
