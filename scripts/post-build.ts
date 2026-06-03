/**
 * Post-build processing script.
 *
 * - Copies CNAME file from project root to dist output directory (if it exists)
 * - Generates a self-contained 404.html page in the dist output directory
 * - Generates SEO files: sitemap.xml, robots.txt, llms.txt
 *
 * Run via: npx tsx scripts/post-build.ts
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { generateLlmsTxt, generateRobotsTxt, generateSitemap } from './generate-seo';
import { BLOG_POSTS } from '../src/app/content/blog-posts.generated';
import { TALKS } from '../src/app/content/talks.generated';
import { PROJECTS } from '../src/app/content/projects.generated';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist', 'k9n-dev', 'browser');

/**
 * Copies the CNAME file from the project root to the dist output directory.
 */
function copyCname(): void {
  const cnameSource = join(ROOT_DIR, 'CNAME');

  if (!existsSync(cnameSource)) {
    console.log('[post-build] No CNAME file found in project root — skipping.');
    return;
  }

  const cnameDest = join(DIST_DIR, 'CNAME');
  copyFileSync(cnameSource, cnameDest);
  console.log('[post-build] Copied CNAME to dist output.');
}

/**
 * Generates a self-contained 404.html page with locale redirect logic.
 *
 * On static hosting (GitHub Pages, Netlify, etc.), 404.html is served for any
 * path without a matching file. This enables backward compatibility:
 * Old URLs like /blog/my-post that lack a locale prefix are automatically
 * redirected to /de/blog/my-post (or /en/blog/my-post based on preference).
 *
 * The page first checks if the path already has a locale prefix — if so,
 * it's a genuine 404. Otherwise, it redirects to the locale-prefixed path.
 */
function generate404(): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — k9n.dev</title>
  <script>
    (function() {
      var SUPPORTED = ['de', 'en'];
      var DEFAULT = 'de';
      var path = window.location.pathname;

      // If the path already starts with a supported locale prefix,
      // it's a genuine 404 — don't redirect, show the error page.
      var hasLocalePrefix = false;
      for (var i = 0; i < SUPPORTED.length; i++) {
        if (path === '/' + SUPPORTED[i] || path.indexOf('/' + SUPPORTED[i] + '/') === 0) {
          hasLocalePrefix = true;
          break;
        }
      }

      if (hasLocalePrefix) {
        // Genuine 404 — page doesn't exist in this locale. Stop here.
        return;
      }

      // Path has no locale prefix → redirect to locale-prefixed version.
      // This handles backward-compatible URLs (e.g., /blog/my-post → /de/blog/my-post).
      function getStoredLocale() {
        try {
          var stored = localStorage.getItem('k9n-preferred-locale');
          if (stored && SUPPORTED.indexOf(stored) !== -1) {
            return stored;
          }
        } catch (e) {}
        return null;
      }

      function detectBrowserLocale() {
        var languages = (navigator.languages && navigator.languages.length)
          ? navigator.languages
          : [navigator.language || ''];
        for (var i = 0; i < languages.length; i++) {
          var lang = languages[i].toLowerCase();
          for (var j = 0; j < SUPPORTED.length; j++) {
            if (lang === SUPPORTED[j] || lang.indexOf(SUPPORTED[j] + '-') === 0) {
              return SUPPORTED[j];
            }
          }
        }
        return null;
      }

      var locale = getStoredLocale() || detectBrowserLocale() || DEFAULT;
      var target = '/' + locale + path;
      target = target.replace(/\\/\\/+/g, '/');

      // Preserve query string and hash
      var search = window.location.search || '';
      var hash = window.location.hash || '';

      window.location.replace(target + search + hash);
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/de/">
  </noscript>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --color-text-primary: #1a1a2e;
      --color-text-secondary: #4a4a68;
      --color-background-primary: #ffffff;
      --color-accent: #3C3599;
      --color-accent-hover: #2b2670;
      --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-text-primary: #f0eef5;
        --color-text-secondary: #b8b5c8;
        --color-background-primary: #0f0f1a;
        --color-accent: #7c74e0;
        --color-accent-hover: #9d96f0;
      }
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--color-background-primary);
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }

    .not-found {
      text-align: center;
      max-width: 480px;
    }

    .not-found h1 {
      font-size: clamp(3rem, 2rem + 5vw, 5rem);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .not-found p {
      font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .not-found a {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
      background-color: var(--color-accent);
      border-radius: 0.75rem;
      text-decoration: none;
      transition: background-color 150ms ease;
    }

    .not-found a:hover {
      background-color: var(--color-accent-hover);
    }

    .not-found a:focus-visible {
      outline: 3px solid var(--color-accent);
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <main class="not-found" role="main">
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <a href="/">Back to Home</a>
  </main>
</body>
</html>
`;

  const dest = join(DIST_DIR, '404.html');
  writeFileSync(dest, html, 'utf-8');
  console.log('[post-build] Generated 404.html.');
}

/**
 * Generates a root-level index.html that redirects visitors to the appropriate
 * locale-prefixed path (/de/ or /en/).
 *
 * Detection priority:
 * 1. Stored preference in localStorage key 'k9n-preferred-locale'
 * 2. Browser language detection via navigator.languages
 * 3. Default fallback to /de/
 *
 * Handles edge cases: no localStorage (private browsing), no matching language.
 */
function generateRedirectPage(): void {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>k9n.dev — Redirecting…</title>
  <script>
    (function() {
      var SUPPORTED = ['de', 'en'];
      var DEFAULT = 'de';

      function getStoredLocale() {
        try {
          var stored = localStorage.getItem('k9n-preferred-locale');
          if (stored && SUPPORTED.indexOf(stored) !== -1) {
            return stored;
          }
        } catch (e) {
          // localStorage unavailable (private browsing, SecurityError)
        }
        return null;
      }

      function detectBrowserLocale() {
        var languages = (navigator.languages && navigator.languages.length)
          ? navigator.languages
          : [navigator.language || ''];

        for (var i = 0; i < languages.length; i++) {
          var lang = languages[i].toLowerCase();
          for (var j = 0; j < SUPPORTED.length; j++) {
            if (lang === SUPPORTED[j] || lang.indexOf(SUPPORTED[j] + '-') === 0) {
              return SUPPORTED[j];
            }
          }
        }
        return null;
      }

      var locale = getStoredLocale() || detectBrowserLocale() || DEFAULT;
      var path = window.location.pathname;

      // Preserve any sub-path after the root (e.g., /blog → /de/blog)
      var subPath = path === '/' ? '/' : path;
      var target = '/' + locale + subPath;

      // Avoid double slashes
      target = target.replace(/\\/\\/+/g, '/');

      window.location.replace(target);
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/de/">
  </noscript>
</head>
<body>
  <p>Redirecting…</p>
</body>
</html>
`;

  const dest = join(DIST_DIR, 'index.html');
  writeFileSync(dest, html, 'utf-8');
  console.log('[post-build] Generated root index.html redirect page.');
}

/**
 * Generates SEO files: sitemap.xml, robots.txt, and llms.txt.
 */
function generateSeoFiles(): void {
  const sitemapContent = generateSitemap(BLOG_POSTS, TALKS, PROJECTS);
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), sitemapContent, 'utf-8');
  console.log('[post-build] Generated sitemap.xml.');

  const robotsContent = generateRobotsTxt();
  writeFileSync(join(DIST_DIR, 'robots.txt'), robotsContent, 'utf-8');
  console.log('[post-build] Generated robots.txt.');

  const llmsContent = generateLlmsTxt(BLOG_POSTS, TALKS, PROJECTS);
  writeFileSync(join(DIST_DIR, 'llms.txt'), llmsContent, 'utf-8');
  console.log('[post-build] Generated llms.txt.');
}

/**
 * Generates legacy redirect pages for backward compatibility.
 *
 * For each prerendered route under /de/ (the default locale), creates a
 * corresponding prefix-less HTML file that immediately redirects to the
 * locale-prefixed version via <meta http-equiv="refresh" content="0; url=...">.
 *
 * This ensures old indexed URLs (e.g., /blog/my-post) don't 404 on GitHub Pages.
 * Google treats meta refresh with content="0" as equivalent to a 301 redirect.
 *
 * Example: /projects/my-project/index.html → redirects to /de/projects/my-project
 */
function generateLegacyRedirects(): void {
  const prerenderedRoutesPath = join(ROOT_DIR, 'dist', 'k9n-dev', 'prerendered-routes.json');
  if (!existsSync(prerenderedRoutesPath)) {
    console.log('[post-build] No prerendered-routes.json found — skipping legacy redirects.');
    return;
  }

  const routesData = JSON.parse(readFileSync(prerenderedRoutesPath, 'utf-8'));
  const allRoutes: string[] = Object.keys(routesData.routes ?? {});

  // Extract routes from default locale (/de/) and generate prefix-less redirects
  const DEFAULT_LOCALE = 'de';
  const prefix = `/${DEFAULT_LOCALE}`;
  const legacyRoutes = allRoutes
    .filter(route => route.startsWith(prefix + '/') || route === prefix)
    .map(route => route.slice(prefix.length)) // Remove /de prefix → /blog/my-post
    .filter(route => route && route !== '/'); // Skip root (handled by index.html redirect)

  let count = 0;
  for (const route of legacyRoutes) {
    const targetUrl = `/${DEFAULT_LOCALE}${route}`;
    const html = generateRedirectHtml(targetUrl);

    // Create the directory structure and write index.html
    const routeDir = join(DIST_DIR, route.replace(/^\//, ''));
    mkdirSync(routeDir, { recursive: true });
    const filePath = join(routeDir, 'index.html');

    // Only write if file doesn't already exist (don't overwrite actual locale builds)
    if (!existsSync(filePath)) {
      writeFileSync(filePath, html, 'utf-8');
      count++;
    }
  }

  console.log(`[post-build] Generated ${count} legacy redirect pages.`);
}

function generateRedirectHtml(targetUrl: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <link rel="canonical" href="https://k9n.dev${targetUrl}">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <title>Weiterleitung</title>
</head>
<body>
  <p>Weiterleitung zu <a href="${targetUrl}">${targetUrl}</a>…</p>
</body>
</html>
`;
}

function postBuild(): void {
  console.log('[post-build] Starting post-build processing...');

  if (!existsSync(DIST_DIR)) {
    console.error(`[post-build] Output directory not found: ${DIST_DIR}`);
    console.error('[post-build] Make sure to run "ng build" before post-build processing.');
    process.exit(1);
  }

  copyCname();
  generate404();
  generateRedirectPage();
  generateLegacyRedirects();
  generateSeoFiles();

  console.log('[post-build] Post-build processing complete.');
}

postBuild();
