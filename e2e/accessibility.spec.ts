import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/about',
  '/contact',
  '/imprint',
  '/blog',
  '/blog/2025-11-aria-live',
  '/talks',
  '/talks/2026-09-30-minde-the-a11y-gap',
  '/projects',
  '/projects/2020-03-12-dotfiles',
  '/book',
];

for (const path of pages) {
  test(`${path} should have no accessibility violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
}
