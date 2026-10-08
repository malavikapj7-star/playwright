const { expect } = require('@playwright/test');
const test = require('../fixtures/test-fixtures');
const { HomePage } = require('../pages/HomePage');

test('should open cart when cart button is clicked', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.clickCart();

  await expect(page).toHaveURL(/\/cart/i);
});
