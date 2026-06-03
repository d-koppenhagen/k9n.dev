import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist', 'k9n-dev', 'browser', 'de');

/**
 * Helper to read an HTML file from the dist directory for a given route.
 */
function readRouteHtml(route: string): string {
  const relativePath = route === '/'
    ? 'index.html'
    : `${route.replace(/^\//, '')}/index.html`;
  const filePath = join(DIST_DIR, relativePath);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Find the first blog post directory that has an index.html file.
 */
function findFirstBlogPostSlug(): string | undefined {
  const blogDir = join(DIST_DIR, 'blog');
  if (!existsSync(blogDir)) return undefined;
  const entries = readdirSync(blogDir);
  return entries.find(entry =>
    statSync(join(blogDir, entry)).isDirectory() &&
    existsSync(join(blogDir, entry, 'index.html'))
  );
}

describe('Prerendered SEO output', () => {
  const distExists = existsSync(DIST_DIR);

  beforeAll(() => {
    if (!distExists) {
      console.warn(
        `Build output not found at ${DIST_DIR}. Skipping prerender SEO tests. Run "npm run build:deploy" first.`
      );
    }
  });

  describe('Blog listing page', () => {
    it.skipIf(!distExists)('contains a <title> tag with content', () => {
      const html = readRouteHtml('/blog');
      expect(html).toMatch(/<title>[^<]+<\/title>/);
    });

    it.skipIf(!distExists)('contains a description meta tag', () => {
      const html = readRouteHtml('/blog');
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains Open Graph meta tags', () => {
      const html = readRouteHtml('/blog');
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:url" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:type" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains Twitter Card meta tags', () => {
      const html = readRouteHtml('/blog');
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains a canonical link element', () => {
      const html = readRouteHtml('/blog');
      expect(html).toMatch(/<link rel="canonical" href="https:\/\/k9n\.dev\/de\/blog"/);
    });

    it.skipIf(!distExists)('contains a JSON-LD script element with valid JSON', () => {
      const html = readRouteHtml('/blog');
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
      expect(jsonLdMatch, 'Expected a JSON-LD script element in the blog listing page').not.toBeNull();

      const jsonLd = JSON.parse(jsonLdMatch![1]);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBeDefined();
    });
  });

  describe('Blog post detail page', () => {
    it.skipIf(!distExists)('contains a <title> tag with content', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug, 'No blog post found in dist').toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      expect(html).toMatch(/<title>[^<]+<\/title>/);
    });

    it.skipIf(!distExists)('contains a description meta tag', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug).toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains Open Graph meta tags including og:type "article"', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug).toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:url" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:type" content="article"/);
    });

    it.skipIf(!distExists)('contains Twitter Card meta tags', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug).toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains a canonical link element pointing to k9n.dev', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug).toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      expect(html).toMatch(/<link rel="canonical" href="https:\/\/k9n\.dev\/de\/blog\/[^"]+"/);
    });

    it.skipIf(!distExists)('contains a JSON-LD script element with valid Article schema', () => {
      const slug = findFirstBlogPostSlug();
      expect(slug).toBeDefined();
      const html = readRouteHtml(`/blog/${slug}`);
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
      expect(jsonLdMatch, 'Expected a JSON-LD script element in the blog post page').not.toBeNull();

      const jsonLd = JSON.parse(jsonLdMatch![1]);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBeDefined();
    });
  });

  describe('Home page', () => {
    it.skipIf(!distExists)('contains a <title> tag with content', () => {
      const html = readRouteHtml('/');
      expect(html).toMatch(/<title>[^<]+<\/title>/);
    });

    it.skipIf(!distExists)('contains a description meta tag', () => {
      const html = readRouteHtml('/');
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains Open Graph meta tags', () => {
      const html = readRouteHtml('/');
      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:url" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:type" content="website"/);
    });

    it.skipIf(!distExists)('contains Twitter Card meta tags', () => {
      const html = readRouteHtml('/');
      expect(html).toMatch(/<meta name="twitter:card" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]+"/);
    });

    it.skipIf(!distExists)('contains a canonical link element', () => {
      const html = readRouteHtml('/');
      expect(html).toMatch(/<link rel="canonical" href="https:\/\/k9n\.dev\/de"/);
    });

    it.skipIf(!distExists)('contains a JSON-LD script element with valid JSON', () => {
      const html = readRouteHtml('/');
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
      expect(jsonLdMatch, 'Expected a JSON-LD script element in the home page').not.toBeNull();

      const jsonLd = JSON.parse(jsonLdMatch![1]);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBeDefined();
    });
  });
});
