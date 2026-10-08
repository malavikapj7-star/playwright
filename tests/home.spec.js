const { expect } = require('@playwright/test');
const test = require('../fixtures/test-fixtures');
const { HomePage } = require('../pages/HomePage');

test('should verify page title when home page is opened', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await expect(page).toHaveTitle(/Green Mark Natural Solutions/i);
  await expect(page).toHaveTitle(/Ayurvedic herbal products/i);
});

test('should display all main menu items when home page is opened', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await expect(homePage.categoriesMenu).toBeVisible();
  if (await homePage.homeMenu.count()) {
    await expect(homePage.homeMenu.first()).toBeVisible();
  }
  if (await homePage.galleryMenu.count()) {
    await expect(homePage.galleryMenu.first()).toBeVisible();
  }

  const productText = page.getByText(/products/i).first();
  await expect(productText).toBeVisible();
});

test('should display products text when menu is visible', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  const productsText = page.getByText(/products/i).first();
  await expect(productsText).toBeVisible();
});

test('should allow search button click when home page is opened', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await expect(homePage.searchButton).toBeVisible();
  await expect(homePage.searchButton).toBeEnabled();
  await homePage.clickSearch();
  await expect(homePage.searchInput).toBeVisible();
});

test('should enable cart button when home page is opened', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await expect(homePage.cartButton).toBeVisible();
  await expect(homePage.cartButton).toBeEnabled();
  await homePage.clickCart();
  await expect(page).toHaveURL(/\/cart/i);
});
