import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { MetaManager } from './meta';
import { PageMeta } from '../../models/content.model';
import { JsonLdArticle, JsonLdPerson, JsonLdWebSite } from '../../models/json-ld.model';

describe('MetaManager', () => {
  let service: MetaManager;
  let document: Document;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'de' }],
    });
    service = TestBed.inject(MetaManager);
    document = TestBed.inject(DOCUMENT);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    // Clean up any injected elements from the document head
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(s => s.remove());
    const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
    canonicals.forEach(l => l.remove());
    const hreflangs = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
    hreflangs.forEach(l => l.remove());
  });

  function createPageMeta(overrides: Partial<PageMeta> = {}): PageMeta {
    return {
      title: 'Test Page',
      description: 'A test page description',
      url: 'https://k9n.dev/test-page',
      ...overrides,
    };
  }

  describe('cleanup on repeated updateMeta calls', () => {
    it('should remove meta tags from the first call when updateMeta is called twice', () => {
      const firstConfig = createPageMeta({
        title: 'First Page',
        description: 'First description',
        url: 'https://k9n.dev/first',
        image: { url: 'https://k9n.dev/img/first.jpg', width: 1200, height: 630 },
      });

      const secondConfig = createPageMeta({
        title: 'Second Page',
        description: 'Second description',
        url: 'https://k9n.dev/second',
      });

      service.updateMeta(firstConfig);

      // Verify first config tags are present
      expect(meta.getTag("property='og:title'")?.getAttribute('content')).toBe('First Page');
      expect(meta.getTag("property='og:image'")?.getAttribute('content')).toBe('https://k9n.dev/de/img/first.jpg');

      service.updateMeta(secondConfig);

      // Verify second config tags are present
      expect(meta.getTag("property='og:title'")?.getAttribute('content')).toBe('Second Page');
      expect(meta.getTag("property='og:description'")?.getAttribute('content')).toBe('Second description');

      // Verify first config's image tags are removed (second config has no image)
      expect(meta.getTag("property='og:image'")).toBeNull();
    });

    it('should update twitter card tags on second call without leaving stale tags', () => {
      const firstConfig = createPageMeta({
        title: 'First Title',
        description: 'First twitter description',
        url: 'https://k9n.dev/first',
      });

      const secondConfig = createPageMeta({
        title: 'Second Title',
        description: 'Second twitter description',
        url: 'https://k9n.dev/second',
      });

      service.updateMeta(firstConfig);
      expect(meta.getTag("name='twitter:title'")?.getAttribute('content')).toBe('First Title');

      service.updateMeta(secondConfig);
      expect(meta.getTag("name='twitter:title'")?.getAttribute('content')).toBe('Second Title');
      expect(meta.getTag("name='twitter:description'")?.getAttribute('content')).toBe('Second twitter description');
    });
  });

  describe('canonical link replacement on navigation', () => {
    it('should replace the canonical link href when navigating between pages', () => {
      const firstConfig = createPageMeta({ url: 'https://k9n.dev/page-one' });
      const secondConfig = createPageMeta({ url: 'https://k9n.dev/page-two' });

      service.updateMeta(firstConfig);

      const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
      expect(canonicalLinks.length).toBe(1);
      expect(canonicalLinks[0].getAttribute('href')).toBe('https://k9n.dev/de/page-one');

      service.updateMeta(secondConfig);

      const updatedCanonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
      expect(updatedCanonicalLinks.length).toBe(1);
      expect(updatedCanonicalLinks[0].getAttribute('href')).toBe('https://k9n.dev/de/page-two');
    });

    it('should not duplicate canonical link elements across multiple navigations', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/a' }));
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/b' }));
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/c' }));

      const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
      expect(canonicalLinks.length).toBe(1);
      expect(canonicalLinks[0].getAttribute('href')).toBe('https://k9n.dev/de/c');
    });
  });

  describe('Canonical URL stripping and selection', () => {
    it('should strip query parameters from the URL', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog?page=2' });

      service.updateMeta(config);

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog');
    });

    it('should strip fragment identifiers from the URL', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog#section' });

      service.updateMeta(config);

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog');
    });

    it('should strip both query parameters and fragment identifiers from the URL', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog?page=2#section' });

      service.updateMeta(config);

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog');
    });

    it('should use canonicalUrl when provided instead of url', () => {
      const config = createPageMeta({
        url: 'https://k9n.dev/blog/post-slug',
        canonicalUrl: 'https://k9n.dev/blog/canonical-slug',
      });

      service.updateMeta(config);

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog/canonical-slug');
    });

    it('should use url when canonicalUrl is not provided', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog/my-post' });

      service.updateMeta(config);

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog/my-post');
    });
  });

  describe('Open Graph tags', () => {
    it('should set all base OG tags correctly', () => {
      const config = createPageMeta({
        title: 'My Page Title',
        description: 'My page description',
        url: 'https://k9n.dev/my-page',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='og:title'")?.getAttribute('content')).toBe('My Page Title');
      expect(meta.getTag("property='og:description'")?.getAttribute('content')).toBe('My page description');
      expect(meta.getTag("property='og:url'")?.getAttribute('content')).toBe('https://k9n.dev/de/my-page');
      expect(meta.getTag("property='og:type'")?.getAttribute('content')).toBe('website');
      expect(meta.getTag("property='og:site_name'")?.getAttribute('content')).toBe('k9n.dev');
      expect(meta.getTag("property='og:locale'")?.getAttribute('content')).toBe('de_DE');
    });

    it('should set og:image tags when image is configured with URL, alt, width, and height', () => {
      const config = createPageMeta({
        image: { url: '/images/hero.jpg', width: 1200, height: 630 },
        imageAlt: 'Hero image description',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='og:image'")?.getAttribute('content')).toBe('https://k9n.dev/de/images/hero.jpg');
      expect(meta.getTag("property='og:image:alt'")?.getAttribute('content')).toBe('Hero image description');
      expect(meta.getTag("property='og:image:width'")?.getAttribute('content')).toBe('1200');
      expect(meta.getTag("property='og:image:height'")?.getAttribute('content')).toBe('630');
    });

    it('should handle absolute image URLs without modification', () => {
      const config = createPageMeta({
        image: { url: 'https://cdn.example.com/photo.png', width: 800, height: 400 },
        imageAlt: 'External image',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='og:image'")?.getAttribute('content')).toBe('https://cdn.example.com/photo.png');
    });

    it('should remove og:image tags when no image is configured', () => {
      // First set with image
      service.updateMeta(createPageMeta({
        image: { url: '/images/test.jpg', width: 1200, height: 630 },
        imageAlt: 'Test image',
      }));

      expect(meta.getTag("property='og:image'")).not.toBeNull();

      // Then set without image
      service.updateMeta(createPageMeta());

      expect(meta.getTag("property='og:image'")).toBeNull();
      expect(meta.getTag("property='og:image:alt'")).toBeNull();
      expect(meta.getTag("property='og:image:width'")).toBeNull();
      expect(meta.getTag("property='og:image:height'")).toBeNull();
    });

    it('should set og:type to "article" for article pages', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-01-15T10:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='og:type'")?.getAttribute('content')).toBe('article');
    });

    it('should set og:type to "website" for non-article pages', () => {
      const config = createPageMeta({ type: 'website' });

      service.updateMeta(config);

      expect(meta.getTag("property='og:type'")?.getAttribute('content')).toBe('website');
    });

    it('should default og:type to "website" when type is not specified', () => {
      const config = createPageMeta();

      service.updateMeta(config);

      expect(meta.getTag("property='og:type'")?.getAttribute('content')).toBe('website');
    });
  });

  describe('Article meta tags', () => {
    it('should set article:published_time for article-type pages', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-03-15T10:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:published_time'")?.getAttribute('content')).toBe('2024-03-15T10:00:00Z');
    });

    it('should set article:modified_time for article-type pages when modifiedTime is provided', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-03-15T10:00:00Z',
        modifiedTime: '2024-04-01T14:30:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:modified_time'")?.getAttribute('content')).toBe('2024-04-01T14:30:00Z');
    });

    it('should not set article:modified_time when modifiedTime is not provided', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-03-15T10:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:modified_time'")).toBeNull();
    });

    it('should set article:tag for each keyword', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-01-01T00:00:00Z',
        keywords: ['angular', 'typescript', 'testing'],
      });

      service.updateMeta(config);

      const articleTags = meta.getTags("property='article:tag'");
      expect(articleTags.length).toBe(3);
      expect(articleTags[0].getAttribute('content')).toBe('angular');
      expect(articleTags[1].getAttribute('content')).toBe('typescript');
      expect(articleTags[2].getAttribute('content')).toBe('testing');
    });

    it('should not set article:tag when keywords are not provided', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-01-01T00:00:00Z',
      });

      service.updateMeta(config);

      const articleTags = meta.getTags("property='article:tag'");
      expect(articleTags.length).toBe(0);
    });

    it('should set article:author when author is configured', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-01-01T00:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:author'")?.getAttribute('content')).toBe('Danny Koppenhagen');
    });

    it('should not set article:author when author is not configured', () => {
      const config = createPageMeta({
        type: 'article',
        publishedTime: '2024-01-01T00:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:author'")).toBeNull();
    });

    it('should not set article meta tags for non-article pages', () => {
      const config = createPageMeta({
        type: 'website',
        keywords: ['angular', 'typescript'],
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("property='article:published_time'")).toBeNull();
      expect(meta.getTag("property='article:modified_time'")).toBeNull();
      expect(meta.getTag("property='article:author'")).toBeNull();
      expect(meta.getTags("property='article:tag'").length).toBe(0);
    });
  });

  describe('Twitter Card tags', () => {
    it('should set twitter:card to "summary_large_image" when image is configured', () => {
      const config = createPageMeta({
        image: { url: '/images/hero.jpg', width: 1200, height: 630 },
      });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:card'")?.getAttribute('content')).toBe('summary_large_image');
    });

    it('should set twitter:card to "summary" when no image is configured', () => {
      const config = createPageMeta();

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:card'")?.getAttribute('content')).toBe('summary');
    });

    it('should truncate twitter:title to 70 characters', () => {
      const longTitle = 'A'.repeat(100);
      const config = createPageMeta({ title: longTitle });

      service.updateMeta(config);

      const twitterTitle = meta.getTag("name='twitter:title'")?.getAttribute('content');
      expect(twitterTitle?.length).toBe(70);
      expect(twitterTitle).toBe('A'.repeat(70));
    });

    it('should not truncate twitter:title when it is 70 characters or less', () => {
      const shortTitle = 'Short Title';
      const config = createPageMeta({ title: shortTitle });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:title'")?.getAttribute('content')).toBe('Short Title');
    });

    it('should truncate twitter:description to 200 characters', () => {
      const longDescription = 'B'.repeat(250);
      const config = createPageMeta({ description: longDescription });

      service.updateMeta(config);

      const twitterDescription = meta.getTag("name='twitter:description'")?.getAttribute('content');
      expect(twitterDescription?.length).toBe(200);
      expect(twitterDescription).toBe('B'.repeat(200));
    });

    it('should not truncate twitter:description when it is 200 characters or less', () => {
      const shortDescription = 'A short description for the page';
      const config = createPageMeta({ description: shortDescription });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:description'")?.getAttribute('content')).toBe(shortDescription);
    });

    it('should set twitter:image when image is configured', () => {
      const config = createPageMeta({
        image: { url: '/images/card.jpg', width: 1200, height: 630 },
      });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:image'")?.getAttribute('content')).toBe('https://k9n.dev/de/images/card.jpg');
    });

    it('should set twitter:image:alt when image and imageAlt are configured', () => {
      const config = createPageMeta({
        image: { url: '/images/card.jpg', width: 1200, height: 630 },
        imageAlt: 'Card image description',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:image:alt'")?.getAttribute('content')).toBe('Card image description');
    });

    it('should not set twitter:image tags when no image is configured', () => {
      const config = createPageMeta();

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:image'")).toBeNull();
      expect(meta.getTag("name='twitter:image:alt'")).toBeNull();
    });

    it('should remove twitter:image tags when navigating from page with image to page without', () => {
      // First page with image
      service.updateMeta(createPageMeta({
        image: { url: '/images/first.jpg', width: 1200, height: 630 },
        imageAlt: 'First image',
      }));

      expect(meta.getTag("name='twitter:image'")).not.toBeNull();
      expect(meta.getTag("name='twitter:image:alt'")).not.toBeNull();

      // Second page without image
      service.updateMeta(createPageMeta());

      expect(meta.getTag("name='twitter:image'")).toBeNull();
      expect(meta.getTag("name='twitter:image:alt'")).toBeNull();
    });

    it('should handle absolute image URLs without modification for twitter:image', () => {
      const config = createPageMeta({
        image: { url: 'https://cdn.example.com/photo.png', width: 800, height: 400 },
      });

      service.updateMeta(config);

      expect(meta.getTag("name='twitter:image'")?.getAttribute('content')).toBe('https://cdn.example.com/photo.png');
    });
  });

  describe('Robots meta tag', () => {
    it('should set robots to "index, follow" for non-draft pages', () => {
      const config = createPageMeta({ draft: false });

      service.updateMeta(config);

      expect(meta.getTag("name='robots'")?.getAttribute('content')).toBe('index, follow');
    });

    it('should set robots to "index, follow" when draft is not specified', () => {
      const config = createPageMeta();

      service.updateMeta(config);

      expect(meta.getTag("name='robots'")?.getAttribute('content')).toBe('index, follow');
    });

    it('should set robots to "noindex, nofollow" for draft pages', () => {
      const config = createPageMeta({ draft: true });

      service.updateMeta(config);

      expect(meta.getTag("name='robots'")?.getAttribute('content')).toBe('noindex, nofollow');
    });
  });

  describe('Author meta tag', () => {
    it('should set author to the configured author name', () => {
      const config = createPageMeta({ author: 'John Doe' });

      service.updateMeta(config);

      expect(meta.getTag("name='author'")?.getAttribute('content')).toBe('John Doe');
    });

    it('should fall back to SITE_CONFIG author name when author is not provided', () => {
      const config = createPageMeta();

      service.updateMeta(config);

      expect(meta.getTag("name='author'")?.getAttribute('content')).toBe('Danny Koppenhagen');
    });

    it('should set author on every page regardless of type', () => {
      service.updateMeta(createPageMeta({ type: 'website' }));
      expect(meta.getTag("name='author'")?.getAttribute('content')).toBe('Danny Koppenhagen');

      service.updateMeta(createPageMeta({ type: 'article', publishedTime: '2024-01-01T00:00:00Z', author: 'Jane Smith' }));
      expect(meta.getTag("name='author'")?.getAttribute('content')).toBe('Jane Smith');
    });
  });

  describe('Keywords meta tag', () => {
    it('should set keywords as a comma-separated list', () => {
      const config = createPageMeta({ keywords: ['angular', 'typescript', 'testing'] });

      service.updateMeta(config);

      expect(meta.getTag("name='keywords'")?.getAttribute('content')).toBe('angular, typescript, testing');
    });

    it('should truncate keywords to max 10 items', () => {
      const keywords = Array.from({ length: 15 }, (_, i) => `keyword${i + 1}`);
      const config = createPageMeta({ keywords });

      service.updateMeta(config);

      const content = meta.getTag("name='keywords'")?.getAttribute('content');
      expect(content?.split(', ').length).toBe(10);
      expect(content).toBe('keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10');
    });

    it('should remove keywords meta tag when keywords array is empty', () => {
      // First set keywords
      service.updateMeta(createPageMeta({ keywords: ['angular'] }));
      expect(meta.getTag("name='keywords'")).not.toBeNull();

      // Then set without keywords
      service.updateMeta(createPageMeta({ keywords: [] }));
      expect(meta.getTag("name='keywords'")).toBeNull();
    });

    it('should remove keywords meta tag when keywords is undefined', () => {
      // First set keywords
      service.updateMeta(createPageMeta({ keywords: ['angular'] }));
      expect(meta.getTag("name='keywords'")).not.toBeNull();

      // Then set without keywords
      service.updateMeta(createPageMeta());
      expect(meta.getTag("name='keywords'")).toBeNull();
    });

    it('should handle a single keyword', () => {
      const config = createPageMeta({ keywords: ['angular'] });

      service.updateMeta(config);

      expect(meta.getTag("name='keywords'")?.getAttribute('content')).toBe('angular');
    });
  });

  describe('injectJsonLd', () => {
    it('should inject a script element with type application/ld+json into the document head', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test',
        description: 'Desc',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01',
      };

      service.injectJsonLd(schema);

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(JSON.parse(scripts[0].textContent!)).toEqual(schema);
    });

    it('should allow multiple JSON-LD scripts to be injected', () => {
      const schema1: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'First',
        description: 'First desc',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01',
      };
      const schema2: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Second',
        description: 'Second desc',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-02-01',
      };

      service.injectJsonLd(schema1);
      service.injectJsonLd(schema2);

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(2);
    });
  });

  describe('Article JSON-LD schema content', () => {
    it('should contain headline, description, author with @type Person and name, and datePublished', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'My Blog Post Title',
        description: 'A detailed description of the blog post',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-06-15T10:00:00Z',
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['headline']).toBe('My Blog Post Title');
      expect(parsed['description']).toBe('A detailed description of the blog post');
      expect(parsed['author']['@type']).toBe('Person');
      expect(parsed['author']['name']).toBe('Danny Koppenhagen');
      expect(parsed['datePublished']).toBe('2024-06-15T10:00:00Z');
    });

    it('should contain dateModified when provided', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Updated Post',
        description: 'Description',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01T00:00:00Z',
        dateModified: '2024-03-15T14:30:00Z',
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['dateModified']).toBe('2024-03-15T14:30:00Z');
    });

    it('should contain image when provided', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Post with Image',
        description: 'Description',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01T00:00:00Z',
        image: 'https://k9n.dev/images/hero.jpg',
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['image']).toBe('https://k9n.dev/images/hero.jpg');
    });

    it('should not contain dateModified or image when not provided', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Minimal Post',
        description: 'Description',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01T00:00:00Z',
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['dateModified']).toBeUndefined();
      expect(parsed['image']).toBeUndefined();
    });
  });

  describe('Person JSON-LD schema content', () => {
    it('should contain name, url, jobTitle, and sameAs array', () => {
      const schema: JsonLdPerson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Danny Koppenhagen',
        url: 'https://k9n.dev',
        jobTitle: 'Software Developer',
        sameAs: [
          'https://github.com/d-koppenhagen',
          'https://linkedin.com/in/danny-koppenhagen',
        ],
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['@type']).toBe('Person');
      expect(parsed['name']).toBe('Danny Koppenhagen');
      expect(parsed['url']).toBe('https://k9n.dev');
      expect(parsed['jobTitle']).toBe('Software Developer');
      expect(parsed['sameAs']).toEqual([
        'https://github.com/d-koppenhagen',
        'https://linkedin.com/in/danny-koppenhagen',
      ]);
    });

    it('should have sameAs as an array of URL strings', () => {
      const schema: JsonLdPerson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Danny Koppenhagen',
        url: 'https://k9n.dev',
        jobTitle: 'Developer',
        sameAs: ['https://github.com/d-koppenhagen'],
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(Array.isArray(parsed['sameAs'])).toBe(true);
      expect(parsed['sameAs'].every((url: string) => url.startsWith('https://'))).toBe(true);
    });
  });

  describe('JSON-LD @context and @type validation', () => {
    it('should contain @context "https://schema.org" for Article schema', () => {
      const schema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test',
        description: 'Desc',
        author: { '@type': 'Person', name: 'Author' },
        datePublished: '2024-01-01',
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('Article');
    });

    it('should contain @context "https://schema.org" for Person schema', () => {
      const schema: JsonLdPerson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Danny Koppenhagen',
        url: 'https://k9n.dev',
        jobTitle: 'Developer',
        sameAs: [],
      };

      service.injectJsonLd(schema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('Person');
    });

    it('should contain @context "https://schema.org" for WebSite schema', () => {
      service.injectWebsiteJsonLd();

      const script = document.head.querySelector('script[type="application/ld+json"]');
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('WebSite');
    });

    it('should produce valid parseable JSON in all injected scripts', () => {
      const articleSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test "with" special <chars> & symbols',
        description: 'Description',
        author: { '@type': 'Person', name: 'Author' },
        datePublished: '2024-01-01',
      };

      service.injectJsonLd(articleSchema);

      const script = document.head.querySelector('script[type="application/ld+json"]');
      expect(() => JSON.parse(script!.textContent!)).not.toThrow();
      const parsed = JSON.parse(script!.textContent!);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['headline']).toBe('Test "with" special <chars> & symbols');
    });
  });

  describe('injectWebsiteJsonLd', () => {
    it('should inject a WebSite JSON-LD script with correct schema content', () => {
      service.injectWebsiteJsonLd();

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);

      const schema = JSON.parse(scripts[0].textContent!);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema['name']).toBe('k9n.dev');
      expect(schema['url']).toBe('https://k9n.dev');
      expect(schema['potentialAction']['@type']).toBe('SearchAction');
      expect(schema['potentialAction']['target']).toContain('https://k9n.dev');
      expect(schema['potentialAction']['target']).toContain('{search_term_string}');
    });

    it('should only inject the WebSite schema once even when called multiple times', () => {
      service.injectWebsiteJsonLd();
      service.injectWebsiteJsonLd();
      service.injectWebsiteJsonLd();

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
    });

    it('should persist the WebSite schema across updateMeta calls', () => {
      service.injectWebsiteJsonLd();

      service.updateMeta(createPageMeta({ title: 'Page 1' }));
      service.updateMeta(createPageMeta({ title: 'Page 2' }));

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);

      const schema = JSON.parse(scripts[0].textContent!);
      expect(schema['@type']).toBe('WebSite');
    });

    it('should not be removed when page-specific JSON-LD is cleaned up', () => {
      service.injectWebsiteJsonLd();

      // Inject a page-specific schema
      const articleSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Blog Post',
        description: 'A blog post',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-06-15',
      };
      service.injectJsonLd(articleSchema);

      // Both should be present
      let scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(2);

      // Navigate (triggers cleanup)
      service.updateMeta(createPageMeta({ title: 'New Page' }));

      // Only WebSite schema should remain
      scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(JSON.parse(scripts[0].textContent!)['@type']).toBe('WebSite');
    });
  });

  describe('JSON-LD cleanup preserves WebSite schema', () => {
    it('should remove page-specific JSON-LD scripts on updateMeta', () => {
      const articleSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        description: 'Article description',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01',
      };

      service.injectJsonLd(articleSchema);

      // Verify the JSON-LD script was injected
      let scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(JSON.parse(scripts[0].textContent!)).toEqual(articleSchema);

      // Simulate navigation by calling updateMeta
      service.updateMeta(createPageMeta({ title: 'New Page' }));

      // Page-specific JSON-LD should be removed
      scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(0);
    });

    it('should preserve WebSite JSON-LD script when page-specific scripts are removed', () => {
      // Manually inject a WebSite schema script to simulate what injectWebsiteJsonLd() will do
      const websiteScript = document.createElement('script');
      websiteScript.setAttribute('type', 'application/ld+json');
      const websiteSchema: JsonLdWebSite = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'k9n.dev',
        url: 'https://k9n.dev',
        potentialAction: { '@type': 'SearchAction', target: 'https://k9n.dev/blog?q={search_term_string}', 'query-input': 'required name=search_term_string' },
      };
      websiteScript.textContent = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteScript);

      // Inject a page-specific Article schema via the service
      const articleSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Blog Post',
        description: 'A blog post',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-06-15',
      };
      service.injectJsonLd(articleSchema);

      // Both scripts should be present
      let scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(2);

      // Navigate to a new page (cleanup happens)
      service.updateMeta(createPageMeta({ title: 'Another Page' }));

      // WebSite schema should persist (not tracked in jsonLdScripts), Article should be removed
      scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      const remaining = JSON.parse(scripts[0].textContent!);
      expect(remaining['@type']).toBe('WebSite');
    });

    it('should allow injecting new page-specific JSON-LD after cleanup', () => {
      const firstSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'First Post',
        description: 'First',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-01-01',
      };

      const secondSchema: JsonLdArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Second Post',
        description: 'Second',
        author: { '@type': 'Person', name: 'Danny Koppenhagen' },
        datePublished: '2024-02-01',
      };

      service.injectJsonLd(firstSchema);
      service.updateMeta(createPageMeta({ title: 'Second Page' }));
      service.injectJsonLd(secondSchema);

      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(JSON.parse(scripts[0].textContent!)['headline']).toBe('Second Post');
    });
  });

  describe('setLlmMeta / LLM-friendly meta tags', () => {
    it('should set citation_public_url to canonical URL on every page', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog/my-post' });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_public_url'")?.getAttribute('content')).toBe('https://k9n.dev/de/blog/my-post');
    });

    it('should set citation_public_url using canonicalUrl when provided', () => {
      const config = createPageMeta({
        url: 'https://k9n.dev/blog/my-post',
        canonicalUrl: 'https://k9n.dev/blog/canonical-post',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_public_url'")?.getAttribute('content')).toBe('https://k9n.dev/de/blog/canonical-post');
    });

    it('should strip query parameters and fragments from citation_public_url', () => {
      const config = createPageMeta({ url: 'https://k9n.dev/blog/post?ref=twitter#comments' });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_public_url'")?.getAttribute('content')).toBe('https://k9n.dev/de/blog/post');
    });

    it('should set citation_public_url for non-article pages', () => {
      const config = createPageMeta({
        url: 'https://k9n.dev/about',
        type: 'website',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_public_url'")?.getAttribute('content')).toBe('https://k9n.dev/de/about');
    });

    it('should set citation_title for blog posts (article type)', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'My Angular Blog Post',
        publishedTime: '2024-06-15T10:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_title'")?.getAttribute('content')).toBe('My Angular Blog Post');
    });

    it('should set citation_author for blog posts (article type)', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'My Post',
        publishedTime: '2024-06-15T10:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_author'")?.getAttribute('content')).toBe('Danny Koppenhagen');
    });

    it('should set dc.title for blog posts', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Dublin Core Title Test',
        publishedTime: '2024-01-01T00:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.title'")?.getAttribute('content')).toBe('Dublin Core Title Test');
    });

    it('should set dc.creator for blog posts', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Test Post',
        publishedTime: '2024-01-01T00:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.creator'")?.getAttribute('content')).toBe('Danny Koppenhagen');
    });

    it('should set dc.date in ISO 8601 YYYY-MM-DD format for blog posts', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Test Post',
        publishedTime: '2024-06-15T10:30:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.date'")?.getAttribute('content')).toBe('2024-06-15');
    });

    it('should set dc.description for blog posts', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Test Post',
        description: 'A detailed description of the blog post content',
        publishedTime: '2024-01-01T00:00:00Z',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.description'")?.getAttribute('content')).toBe('A detailed description of the blog post content');
    });

    it('should not set citation_title for non-article pages', () => {
      const config = createPageMeta({
        type: 'website',
        title: 'Home Page',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_title'")).toBeNull();
    });

    it('should not set citation_author for non-article pages', () => {
      const config = createPageMeta({
        type: 'website',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_author'")).toBeNull();
    });

    it('should not set Dublin Core tags (dc.title, dc.creator, dc.date, dc.description) for non-article pages', () => {
      const config = createPageMeta({
        type: 'website',
        title: 'Home Page',
        description: 'Welcome to k9n.dev',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.title'")).toBeNull();
      expect(meta.getTag("name='dc.creator'")).toBeNull();
      expect(meta.getTag("name='dc.date'")).toBeNull();
      expect(meta.getTag("name='dc.description'")).toBeNull();
    });

    it('should not set Dublin Core and citation tags when type is not specified (defaults to website)', () => {
      const config = createPageMeta({
        title: 'Default Page',
        description: 'A default page',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_title'")).toBeNull();
      expect(meta.getTag("name='citation_author'")).toBeNull();
      expect(meta.getTag("name='dc.title'")).toBeNull();
      expect(meta.getTag("name='dc.creator'")).toBeNull();
      expect(meta.getTag("name='dc.date'")).toBeNull();
      expect(meta.getTag("name='dc.description'")).toBeNull();
    });

    it('should omit citation_author when author is not configured for article pages', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Post Without Author',
        publishedTime: '2024-01-01T00:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='citation_author'")).toBeNull();
    });

    it('should omit dc.creator when author is not configured for article pages', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Post Without Author',
        publishedTime: '2024-01-01T00:00:00Z',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.creator'")).toBeNull();
    });

    it('should omit dc.date when publishedTime is not configured for article pages', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Post Without Date',
        author: 'Danny Koppenhagen',
      });

      service.updateMeta(config);

      expect(meta.getTag("name='dc.date'")).toBeNull();
    });

    it('should remove LLM meta tags from previous page on navigation', () => {
      // First page: article with all LLM tags
      const articleConfig = createPageMeta({
        type: 'article',
        title: 'Blog Post',
        description: 'Blog description',
        publishedTime: '2024-06-15T10:00:00Z',
        author: 'Danny Koppenhagen',
        url: 'https://k9n.dev/blog/post',
      });

      service.updateMeta(articleConfig);

      // Verify article LLM tags are present
      expect(meta.getTag("name='citation_title'")).not.toBeNull();
      expect(meta.getTag("name='citation_author'")).not.toBeNull();
      expect(meta.getTag("name='dc.title'")).not.toBeNull();
      expect(meta.getTag("name='dc.creator'")).not.toBeNull();
      expect(meta.getTag("name='dc.date'")).not.toBeNull();
      expect(meta.getTag("name='dc.description'")).not.toBeNull();

      // Navigate to a non-article page
      const websiteConfig = createPageMeta({
        type: 'website',
        title: 'Home',
        description: 'Welcome',
        url: 'https://k9n.dev',
      });

      service.updateMeta(websiteConfig);

      // Article-specific LLM tags should be removed
      expect(meta.getTag("name='citation_title'")).toBeNull();
      expect(meta.getTag("name='citation_author'")).toBeNull();
      expect(meta.getTag("name='dc.title'")).toBeNull();
      expect(meta.getTag("name='dc.creator'")).toBeNull();
      expect(meta.getTag("name='dc.date'")).toBeNull();
      expect(meta.getTag("name='dc.description'")).toBeNull();

      // citation_public_url should still be set (it's always set)
      expect(meta.getTag("name='citation_public_url'")?.getAttribute('content')).toBe('https://k9n.dev/de');
    });

    it('should not render meta tags with empty content when optional values are missing', () => {
      const config = createPageMeta({
        type: 'article',
        title: 'Post Title',
        description: 'Post description',
        publishedTime: '2024-01-01T00:00:00Z',
        // author is intentionally not set
      });

      service.updateMeta(config);

      // citation_author and dc.creator should be absent, not empty
      const citationAuthor = meta.getTag("name='citation_author'");
      const dcCreator = meta.getTag("name='dc.creator'");
      expect(citationAuthor).toBeNull();
      expect(dcCreator).toBeNull();
    });
  });

  describe('i18n: og:locale with LOCALE_ID=de', () => {
    it('should set og:locale to de_DE when locale is de', () => {
      service.updateMeta(createPageMeta());

      expect(meta.getTag("property='og:locale'")?.getAttribute('content')).toBe('de_DE');
    });
  });

  describe('i18n: hreflang links with LOCALE_ID=de', () => {
    it('should generate hreflang links for both de and en locales', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog' }));

      const hreflangLinks = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(hreflangLinks.length).toBe(2);
    });

    it('should generate correct href values for hreflang links', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog' }));

      const deLink = document.head.querySelector('link[rel="alternate"][hreflang="de"]');
      const enLink = document.head.querySelector('link[rel="alternate"][hreflang="en"]');

      expect(deLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog');
      expect(enLink?.getAttribute('href')).toBe('https://k9n.dev/en/blog');
    });

    it('should strip existing locale prefix from URL before generating hreflang links', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/de/talks' }));

      const deLink = document.head.querySelector('link[rel="alternate"][hreflang="de"]');
      const enLink = document.head.querySelector('link[rel="alternate"][hreflang="en"]');

      expect(deLink?.getAttribute('href')).toBe('https://k9n.dev/de/talks');
      expect(enLink?.getAttribute('href')).toBe('https://k9n.dev/en/talks');
    });

    it('should clean up old hreflang links and regenerate on navigation', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog' }));

      let hreflangLinks = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(hreflangLinks.length).toBe(2);
      expect(document.head.querySelector('link[rel="alternate"][hreflang="de"]')?.getAttribute('href')).toBe('https://k9n.dev/de/blog');

      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/talks/my-talk' }));

      hreflangLinks = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(hreflangLinks.length).toBe(2);
      expect(document.head.querySelector('link[rel="alternate"][hreflang="de"]')?.getAttribute('href')).toBe('https://k9n.dev/de/talks/my-talk');
      expect(document.head.querySelector('link[rel="alternate"][hreflang="en"]')?.getAttribute('href')).toBe('https://k9n.dev/en/talks/my-talk');
    });
  });

  describe('i18n: canonical URL includes locale prefix with LOCALE_ID=de', () => {
    it('should include de locale prefix in canonical URL', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog/my-post' }));

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog/my-post');
    });

    it('should not duplicate locale prefix if already present', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/de/blog/my-post' }));

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog/my-post');
    });
  });
});

describe('MetaManager with LOCALE_ID=en', () => {
  let service: MetaManager;
  let document: Document;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'en' }],
    });
    service = TestBed.inject(MetaManager);
    document = TestBed.inject(DOCUMENT);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(s => s.remove());
    const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
    canonicals.forEach(l => l.remove());
    const hreflangs = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
    hreflangs.forEach(l => l.remove());
  });

  function createPageMeta(overrides: Partial<PageMeta> = {}): PageMeta {
    return {
      title: 'Test Page',
      description: 'A test page description',
      url: 'https://k9n.dev/test-page',
      ...overrides,
    };
  }

  describe('i18n: og:locale with LOCALE_ID=en', () => {
    it('should set og:locale to en_US when locale is en', () => {
      service.updateMeta(createPageMeta());

      expect(meta.getTag("property='og:locale'")?.getAttribute('content')).toBe('en_US');
    });
  });

  describe('i18n: hreflang links with LOCALE_ID=en', () => {
    it('should generate hreflang links for both de and en locales', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog' }));

      const hreflangLinks = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(hreflangLinks.length).toBe(2);
    });

    it('should generate correct href values for hreflang links', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog' }));

      const deLink = document.head.querySelector('link[rel="alternate"][hreflang="de"]');
      const enLink = document.head.querySelector('link[rel="alternate"][hreflang="en"]');

      expect(deLink?.getAttribute('href')).toBe('https://k9n.dev/de/blog');
      expect(enLink?.getAttribute('href')).toBe('https://k9n.dev/en/blog');
    });
  });

  describe('i18n: canonical URL includes locale prefix with LOCALE_ID=en', () => {
    it('should include en locale prefix in canonical URL', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/blog/my-post' }));

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/en/blog/my-post');
    });

    it('should not duplicate locale prefix if already present', () => {
      service.updateMeta(createPageMeta({ url: 'https://k9n.dev/en/blog/my-post' }));

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://k9n.dev/en/blog/my-post');
    });
  });
});
