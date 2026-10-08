const base = require('@playwright/test');
require('dotenv').config();

module.exports = base.test.extend({
  app: async ({ page }, use) => {
    const baseUrl = process.env.BASE_URL || 'https://www.greenmarknatural.com';
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await use(page);
  },
});
