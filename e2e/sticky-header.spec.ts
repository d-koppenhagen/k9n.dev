import { expect, test, type Page } from '@playwright/test';

/**
 * E2E coverage for GitHub issue #215: the site header must be sticky and
 * anchor navigation (table-of-contents links, direct hash loads) must offset
 * the scroll position so the targeted heading is never hidden behind the
 * sticky header.
 *
 * A blog post with a long table of contents is used as the fixture because it
 * exercises every behavior at once: a sticky header, a scrollable TOC in a
 * sticky sidebar (desktop), fragment navigation, and the series navigation.
 */
const POST = '/blog/2026-10-aria-notify';

/**
 * Open a page with smooth scrolling disabled so scroll positions settle
 * synchronously. Smooth-scroll animations make exact-position assertions
 * timing-dependent; forcing `auto` removes that flakiness without changing the
 * behavior under test (the offset is identical, only the animation differs).
 */
async function openStable(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = `html { scroll-behavior: auto !important; }`;
    document.documentElement.appendChild(style);
  });
  await page.goto(path, { waitUntil: 'domcontentloaded' });
}

/**
 * Force the full article to lay out before measuring anchor positions.
 *
 * Code blocks are syntax-highlighted lazily, which changes the document height
 * as they render while scrolling. If that happens *during* an anchor jump the
 * target's resting position keeps shifting, making exact assertions flaky. We
 * pre-scroll to the bottom (triggering all lazy layout) and poll until the
 * document height stops changing, then return to the top. After this the page
 * height is stable and anchor jumps land deterministically.
 */
async function settleLayout(page: Page): Promise<void> {
  // Step down the page from the Playwright side (abortable, unlike a long
  // in-page async loop) until the document height stops growing.
  let previous = -1;
  for (let i = 0; i < 40; i++) {
    const height = await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
      return document.documentElement.scrollHeight;
    });
    if (height === previous) break;
    previous = height;
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
}

/** Bounding box of the sticky header (throws if missing, so tests stay honest). */
async function headerRect(page: Page) {
  const box = await page.locator('header.site-header').boundingBox();
  expect(box, 'site header should be present').not.toBeNull();
  return box!;
}

test.describe('Sticky header (issue #215)', () => {
  test('header stays pinned to the top of the viewport while scrolling', async ({ page }) => {
    await openStable(page, POST);

    const header = page.locator('header.site-header');
    await expect(header).toHaveCSS('position', 'sticky');

    // Before scrolling, the header sits at the top already.
    const before = await headerRect(page);
    expect(before.y).toBeLessThanOrEqual(1);

    // Scroll far down; the header must remain pinned at y ~ 0.
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect
      .poll(async () => Math.round((await headerRect(page)).y))
      .toBe(0);

    // Scroll even further to be sure it is not merely in the initial position.
    await page.evaluate(() => window.scrollTo(0, 5000));
    await expect
      .poll(async () => Math.round((await headerRect(page)).y))
      .toBe(0);
  });

  test('clicking a table-of-contents link offsets the target below the header', async ({ page }) => {
    await openStable(page, POST);

    const links = page.locator('.toc__link');
    await expect(links.first()).toBeVisible();
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(1);

    // Stabilize the document height before measuring anchor positions.
    await settleLayout(page);

    // Exercise several links spread across the list, not just one.
    const indices = [0, Math.floor(linkCount / 2), linkCount - 1];

    for (const index of indices) {
      const link = links.nth(index);
      const href = await link.getAttribute('href');
      const fragment = decodeURIComponent((href ?? '').split('#')[1] ?? '');
      expect(fragment, `TOC link ${index} should carry a fragment`).not.toBe('');

      // On desktop the TOC sits in a sticky sidebar; on mobile it flows inline
      // near the end of the article. Bring the link into view, then click it.
      await link.scrollIntoViewIfNeeded();
      await link.click();

      // The URL hash reflects the clicked fragment (compare decoded forms so
      // encoding differences between browsers don't cause false failures).
      await expect
        .poll(() => page.evaluate(() => decodeURIComponent(location.hash.slice(1))))
        .toBe(fragment);

      const header = await headerRect(page);
      const headerBottom = Math.round(header.height);

      // The scroll runs programmatically and the page height can still change
      // while lazily-highlighted code blocks render, so the target position
      // settles over a few frames. Poll until it reaches its resting state and
      // assert on that resting state. The target is correct when it sits just
      // below the sticky header (snug), OR — for a heading near the very bottom
      // of the document, where the browser cannot scroll any further — when it
      // is simply not covered by the header.
      await expect
        .poll(
          () =>
            page.evaluate(
              ({ frag, headerBottom }) => {
                const el = document.getElementById(frag);
                if (!el) return false;
                const top = Math.round(el.getBoundingClientRect().top);
                const maxScroll =
                  document.documentElement.scrollHeight - window.innerHeight;
                const atBottom = Math.ceil(window.scrollY) >= Math.floor(maxScroll);
                const notCovered = top >= headerBottom;
                const snug = top < headerBottom + 160;
                return notCovered && (snug || atBottom);
              },
              { frag: fragment, headerBottom },
            ),
          { message: `TOC link "${fragment}" should settle snugly below the sticky header` },
        )
        .toBe(true);
    }
  });

  test('loading a URL with a hash offsets the target below the header', async ({ page }) => {
    // Grab a real fragment from the rendered TOC first, so the test is not
    // coupled to a hardcoded heading id that could change with content edits.
    await openStable(page, POST);
    const href = await page.locator('.toc__link').nth(5).getAttribute('href');
    const fragment = decodeURIComponent((href ?? '').split('#')[1] ?? '');
    expect(fragment).not.toBe('');

    // Now load the post directly with that hash (native browser anchor scroll).
    await openStable(page, `${POST}#${encodeURIComponent(fragment)}`);

    const header = await headerRect(page);
    await expect
      .poll(async () =>
        page.evaluate((frag) => {
          const el = document.getElementById(frag);
          return el ? Math.round(el.getBoundingClientRect().top) : null;
        }, fragment),
      )
      .toBeGreaterThanOrEqual(Math.round(header.height));
  });
});

test.describe('Content layout around the sticky header (issue #215)', () => {
  test('series navigation renders in the content flow, not in the sidebar', async ({ page }) => {
    await openStable(page, POST);

    const series = page.locator('app-series-navigation');
    await expect(series).toBeVisible();

    // It is an ordered list with the current entry marked via aria-current.
    await expect(series.locator('ol')).toBeVisible();
    await expect(series.locator('[aria-current="page"]')).toHaveCount(1);

    // It must live inside the article content, not inside the TOC sidebar.
    const inContent = await page.evaluate(() => {
      const el = document.querySelector('.blog-detail__content app-series-navigation');
      return !!el;
    });
    expect(inContent).toBe(true);

    const inSidebar = await page.evaluate(() => {
      const el = document.querySelector('.article-detail-layout__sidebar app-series-navigation');
      return !!el;
    });
    expect(inSidebar).toBe(false);
  });

  test('table of contents is height-constrained and scrolls internally on desktop', async ({ page }) => {
    await openStable(page, POST);

    const viewportWidth = page.viewportSize()?.width ?? 0;
    // The sticky sidebar and the TOC height cap only apply at the desktop
    // breakpoint (>= 1024px). On narrower layouts the TOC flows inline, so this
    // assertion does not apply and the test is skipped deterministically.
    test.skip(viewportWidth < 1024, `TOC height cap only applies >= 1024px (viewport ${viewportWidth}px)`);

    const toc = page.locator('app-table-of-contents .toc');
    await expect(toc).toBeVisible();

    // The TOC must declare internal scrolling and a bounded max-height.
    await expect(toc).toHaveCSS('overflow-y', 'auto');
    const maxHeight = await toc.evaluate((el) => getComputedStyle(el).maxHeight);
    expect(maxHeight).not.toBe('none');

    // After scrolling down, the sticky TOC must stay fully within the viewport
    // (its bottom edge must not run past the viewport height) so no entries are
    // cut off and unreachable.
    await page.evaluate(() => window.scrollTo(0, 3000));
    const viewportHeight = page.viewportSize()?.height ?? 0;
    await expect
      .poll(async () => {
        const box = await toc.boundingBox();
        return box ? Math.round(box.y + box.height) : null;
      })
      .toBeLessThanOrEqual(viewportHeight);

    // And its top edge must sit at or below the sticky header, never under it.
    const header = await headerRect(page);
    const tocBox = await toc.boundingBox();
    expect(tocBox).not.toBeNull();
    expect(tocBox!.y).toBeGreaterThanOrEqual(Math.round(header.height) - 1);
  });
});
