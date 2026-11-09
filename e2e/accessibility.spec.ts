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

      // Wait for a settled paint before scanning. The theme is applied via a
      // `data-theme` attribute whose tokens drive CSS transitions (e.g. the
      // interactive cards animate their `background-color`). Scanning on the
      // very next frame can catch a mid-transition background, which makes
      // axe's color-contrast heuristic blend against a half-applied color and
      // report false positives. Waiting for web fonts to finish loading and
      // for any running transitions to complete gives axe a stable surface to
      // measure — without resorting to `networkidle`, which hangs on slow
      // third-party thumbnails.
      await page.evaluate(async () => {
        await document.fonts.ready;
        const transitioning = Array.from(document.querySelectorAll('*')).map(
          (el) =>
            Promise.race([
              new Promise<void>((resolve) =>
                el.addEventListener('transitionend', () => resolve(), { once: true }),
              ),
              new Promise<void>((resolve) => setTimeout(resolve, 500)),
            ]),
        );
        await Promise.all([
          ...transitioning,
          new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
        ]);
      });

      // Exclude the contents of embedded slide decks (e.g. reveal.js talks
      // rendered inside an <iframe>). These are third-party pages we cannot
      // change, so their internal a11y issues (like `nested-interactive`)
      // must not fail our own site's audit. The <iframe> element itself is
      // still scanned, so it must carry an accessible `title`.
      const results = await new AxeBuilder({ page }).exclude('iframe').analyze();

      expect(results.violations).toEqual([]);
    });
  }
}
