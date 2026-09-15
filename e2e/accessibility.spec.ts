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

const themes = ['light', 'dark'] as const;

for (const theme of themes) {
  for (const path of pages) {
    test(`[${theme}] ${path} should have no accessibility violations`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.addInitScript((t) => {
        localStorage.setItem('theme-preference', t);
      }, theme);
      // Avoid `networkidle`: several content pages (e.g. /talks) load thumbnails
      // and publisher logos from third-party domains that can hang or respond
      // slowly on CI, so the network never becomes idle within the timeout.
      // Waiting for the DOM plus the applied theme is enough for the a11y scan.
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.locator(`html[data-theme="${theme}"]`).waitFor({ timeout: 5000 });

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
}
