import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const BROWSER_DIR = join(ROOT_DIR, 'dist', 'k9n-dev', 'browser');
const DIST_DIR = join(BROWSER_DIR, 'de');
const PRERENDERED_ROUTES_PATH = join(ROOT_DIR, 'dist', 'k9n-dev', 'prerendered-routes.json');

/**
 * Helper to read an HTML file from the dist directory for a given route.
 * Routes like "/" map to "index.html", "/blog" maps to "blog/index.html", etc.
 */
function readRouteHtml(route: string): string {
  const relativePath = route === '/'
    ? 'index.html'
    : `${route.replace(/^\//, '')}/index.html`;
  const filePath = join(DIST_DIR, relativePath);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Helper to check if a file exists in the dist directory.
 */
function distFileExists(relativePath: string): boolean {
  return existsSync(join(DIST_DIR, relativePath));
}

describe('Build Output Integration Tests', () => {
  beforeAll(() => {
    if (!existsSync(DIST_DIR)) {
      throw new Error(
        `Build output directory not found at ${DIST_DIR}. Run "npm run build:deploy" before running integration tests.`
      );
    }
  });

  describe('Static HTML files for all known routes', () => {
    it('should have a prerendered-routes.json file', () => {
      expect(existsSync(PRERENDERED_ROUTES_PATH)).toBe(true);
    });

    it('should produce static HTML files for all prerendered routes', () => {
      const routesJson = JSON.parse(readFileSync(PRERENDERED_ROUTES_PATH, 'utf-8'));
      const routes: string[] = Object.keys(routesJson.routes);

      expect(routes.length).toBeGreaterThan(0);

      for (const route of routes) {
        const relativePath = route === '/'
          ? 'index.html'
          : `${route.replace(/^\//, '')}/index.html`;
        const filePath = join(BROWSER_DIR, relativePath);
        expect(existsSync(filePath), `Missing HTML file for route: ${route}`).toBe(true);
      }
    });

    it('should produce HTML files for static listing pages', () => {
      expect(distFileExists('index.html')).toBe(true);
      expect(distFileExists('blog/index.html')).toBe(true);
      expect(distFileExists('talks/index.html')).toBe(true);
      expect(distFileExists('projects/index.html')).toBe(true);
      expect(distFileExists('contact/index.html')).toBe(true);
      expect(distFileExists('imprint/index.html')).toBe(true);
    });

    it('should produce HTML files for blog post detail pages', () => {
      const blogDir = join(DIST_DIR, 'blog');
      const entries = readdirSync(blogDir);
      const blogDirs = entries.filter(entry =>
        statSync(join(blogDir, entry)).isDirectory()
      );

      expect(blogDirs.length).toBeGreaterThan(0);

      for (const dir of blogDirs) {
        expect(
          existsSync(join(blogDir, dir, 'index.html')),
          `Missing index.html for blog/${dir}`
        ).toBe(true);
      }
    });

    it('should produce HTML files for talk detail pages', () => {
      const talksDir = join(DIST_DIR, 'talks');
      const entries = readdirSync(talksDir);
      const talkDirs = entries.filter(entry =>
        statSync(join(talksDir, entry)).isDirectory()
      );

      expect(talkDirs.length).toBeGreaterThan(0);

      for (const dir of talkDirs) {
        expect(
          existsSync(join(talksDir, dir, 'index.html')),
          `Missing index.html for talks/${dir}`
        ).toBe(true);
      }
    });

    it('should produce HTML files for project detail pages', () => {
      const projectsDir = join(DIST_DIR, 'projects');
      const entries = readdirSync(projectsDir);
      const projectDirs = entries.filter(entry =>
        statSync(join(projectsDir, entry)).isDirectory()
      );

      expect(projectDirs.length).toBeGreaterThan(0);

      for (const dir of projectDirs) {
        expect(
          existsSync(join(projectsDir, dir, 'index.html')),
          `Missing index.html for projects/${dir}`
        ).toBe(true);
      }
    });
  });

  describe('Pre-rendered HTML contains meta tags', () => {
    it('should contain title, description, OG, and Twitter Card tags on the home page', () => {
      const html = readRouteHtml('/');

      expect(html).toMatch(/<title>[^<]+<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:url" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]+"/);
    });

    it('should contain meta tags on a blog post detail page', () => {
      const blogDir = join(DIST_DIR, 'blog');
      const entries = readdirSync(blogDir);
      const firstBlogDir = entries.find(entry =>
        statSync(join(blogDir, entry)).isDirectory()
      );

      expect(firstBlogDir).toBeDefined();

      const html = readFileSync(join(blogDir, firstBlogDir!, 'index.html'), 'utf-8');

      expect(html).toMatch(/<title>[^<]+<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:url" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:type" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]+"/);
    });

    it('should contain meta tags on the blog listing page', () => {
      const html = readRouteHtml('/blog');

      expect(html).toMatch(/<title>[^<]+<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
    });

    it('should contain meta tags on the contact page', () => {
      const html = readRouteHtml('/contact');

      expect(html).toMatch(/<title>[^<]+<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
    });

    it('should have og:url pointing to k9n.dev domain on blog posts', () => {
      const blogDir = join(DIST_DIR, 'blog');
      const entries = readdirSync(blogDir);
      const firstBlogDir = entries.find(entry =>
        statSync(join(blogDir, entry)).isDirectory()
      );

      expect(firstBlogDir).toBeDefined();

      const html = readFileSync(join(blogDir, firstBlogDir!, 'index.html'), 'utf-8');
      const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/);

      expect(ogUrlMatch).not.toBeNull();
      expect(ogUrlMatch![1]).toMatch(/^https:\/\/k9n\.dev\//);
    });
  });

  describe('404.html generation', () => {
    it('should generate a 404.html file', () => {
      expect(existsSync(join(BROWSER_DIR, '404.html'))).toBe(true);
    });

    it('should contain a heading indicating page not found', () => {
      const html = readFileSync(join(BROWSER_DIR, '404.html'), 'utf-8');
      expect(html).toContain('Page Not Found');
    });

    it('should contain a navigation link back to the home page', () => {
      const html = readFileSync(join(BROWSER_DIR, '404.html'), 'utf-8');
      expect(html).toMatch(/<a[^>]+href=["']\/["'][^>]*>/);
    });

    it('should be a self-contained HTML page with inline styles', () => {
      const html = readFileSync(join(BROWSER_DIR, '404.html'), 'utf-8');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('<head>');
      expect(html).toContain('<style>');
      expect(html).toContain('<title>');
    });
  });

  describe('No external CSS/JS framework URLs in served HTML', () => {
    const EXTERNAL_FRAMEWORK_PATTERNS = [
      /https?:\/\/cdn\.jsdelivr\.net/i,
      /https?:\/\/cdnjs\.cloudflare\.com/i,
      /https?:\/\/unpkg\.com/i,
      /https?:\/\/stackpath\.bootstrapcdn\.com/i,
      /https?:\/\/maxcdn\.bootstrapcdn\.com/i,
      /https?:\/\/code\.jquery\.com/i,
      /https?:\/\/ajax\.googleapis\.com\/ajax\/libs/i,
      /https?:\/\/fonts\.googleapis\.com\/css/i,
      /https?:\/\/use\.fontawesome\.com/i,
      /https?:\/\/cdn\.tailwindcss\.com/i,
    ];

    it('should not include external CSS/JS framework URLs on the home page', () => {
      const html = readRouteHtml('/');

      for (const pattern of EXTERNAL_FRAMEWORK_PATTERNS) {
        expect(html).not.toMatch(pattern);
      }
    });

    it('should not include external CSS/JS framework URLs on a blog post page', () => {
      const blogDir = join(DIST_DIR, 'blog');
      const entries = readdirSync(blogDir);
      const firstBlogDir = entries.find(entry =>
        statSync(join(blogDir, entry)).isDirectory()
      );

      expect(firstBlogDir).toBeDefined();

      const html = readFileSync(join(blogDir, firstBlogDir!, 'index.html'), 'utf-8');

      for (const pattern of EXTERNAL_FRAMEWORK_PATTERNS) {
        expect(html).not.toMatch(pattern);
      }
    });

    it('should not include external CSS/JS framework URLs on the contact page', () => {
      const html = readRouteHtml('/contact');

      for (const pattern of EXTERNAL_FRAMEWORK_PATTERNS) {
        expect(html).not.toMatch(pattern);
      }
    });

    it('should not have external stylesheet links (except self-hosted)', () => {
      const html = readRouteHtml('/');
      // Match <link rel="stylesheet" href="..."> where href starts with http
      const externalStylesheets = html.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//gi);
      expect(externalStylesheets).toBeNull();
    });

    it('should not have external script sources (except self-hosted)', () => {
      const html = readRouteHtml('/');
      // Match <script src="..."> where src starts with http
      const externalScripts = html.match(/<script[^>]+src=["']https?:\/\//gi);
      expect(externalScripts).toBeNull();
    });
  });
});
