const { expect } = require('@playwright/test');
const test = require('../fixtures/test-fixtures');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');

test('should display shampoo products when shampoo is searched', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);

  await homePage.open();
  await homePage.clickSearch();
  await homePage.searchInput.fill('shampoo');
  await homePage.searchForProduct('shampoo');

  await expect(page).toHaveURL(/\/search\?/i);
  await expect(searchPage.searchResults).toContainText(/shampoo/i);
});

test('should display exactly four sort options when shampoo results are shown', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.gotoSearchResults('shampoo');

  const options = await searchPage.getSortOptions();
  expect(options).toHaveLength(4);
  expect(options).toEqual(['Popularity', 'Newest', 'Price Low to High', 'Price High to Low']);
});
