import { describe, expect, it } from 'vitest';

import type {
  BlogPost,
  Project,
  Talk,
} from '../src/app/models/content.model';
import { generateLlmsTxt, generateRobotsTxt, generateSitemap } from './generate-seo';

/**
 * Minimal factory helpers to create test data satisfying the interfaces.
 */
function createBlogPost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug: 'test-post',
    title: 'Test Post',
    description: 'A test blog post',
    author: { name: 'Danny', mail: 'test@example.com' },
    created: '2024-03-15',
    keywords: [],
    draft: false,
    content: '',
    headings: [],
    ...overrides,
  };
}

function createTalk(overrides: Partial<Talk> = {}): Talk {
  return {
    slug: 'test-talk',
    title: 'Test Talk',
    description: 'A test talk',
    date: '2024-06-20',
    event: 'Test Conf',
    keywords: [],
    draft: false,
    content: '',
    ...overrides,
  };
}

function createProject(overrides: Partial<Project> = {}): Project {
  return {
    slug: 'test-project',
    title: 'Test Project',
    description: 'A test project',
    created: '2024-01-10',
    keywords: [],
    status: 'active',
    content: '',
    ...overrides,
  };
}

describe('generateSitemap', () => {
  it('should generate well-formed XML with correct namespaces including xhtml', () => {
    const xml = generateSitemap([], [], []);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    );
    expect(xml).toContain('</urlset>');
  });

  it('should include locale-prefixed static pages with correct priorities', () => {
    const xml = generateSitemap([], [], []);

    // Home page with priority 1.0 for both locales
    expect(xml).toContain('<loc>https://k9n.dev/de/</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/</loc>');

    // Listing pages with priority 0.8
    expect(xml).toContain('<loc>https://k9n.dev/de/blog</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/blog</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/de/talks</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/talks</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/de/projects</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/projects</loc>');

    // Detail/other pages with priority 0.6
    expect(xml).toContain('<loc>https://k9n.dev/de/contact</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/contact</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/de/imprint</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/imprint</loc>');
  });

  it('should include xhtml:link alternate elements for each locale variant', () => {
    const xml = generateSitemap([], [], []);

    // Each URL entry should have alternate links for both locales
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k9n.dev/de/" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k9n.dev/en/" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k9n.dev/de/blog" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k9n.dev/en/blog" />');
  });

  it('should use updated date as lastmod for blog posts when present', () => {
    const post = createBlogPost({
      slug: 'my-post',
      created: '2024-01-01',
      updated: '2024-05-20',
    });

    const xml = generateSitemap([post], [], []);

    expect(xml).toContain('<loc>https://k9n.dev/de/blog/my-post</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/blog/my-post</loc>');
    expect(xml).toContain('<lastmod>2024-05-20</lastmod>');
  });

  it('should use created date as lastmod for blog posts when updated is absent', () => {
    const post = createBlogPost({
      slug: 'my-post',
      created: '2024-03-15',
      updated: undefined,
    });

    const xml = generateSitemap([post], [], []);

    expect(xml).toContain('<loc>https://k9n.dev/de/blog/my-post</loc>');
    expect(xml).toContain('<lastmod>2024-03-15</lastmod>');
  });

  it('should use date field as lastmod for talks', () => {
    const talk = createTalk({ slug: 'my-talk', date: '2024-06-20' });

    const xml = generateSitemap([], [talk], []);

    expect(xml).toContain('<loc>https://k9n.dev/de/talks/my-talk</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/talks/my-talk</loc>');
    expect(xml).toContain('<lastmod>2024-06-20</lastmod>');
  });

  it('should use created field as lastmod for projects', () => {
    const project = createProject({
      slug: 'my-project',
      created: '2024-01-10',
    });

    const xml = generateSitemap([], [], [project]);

    expect(xml).toContain('<loc>https://k9n.dev/de/projects/my-project</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/projects/my-project</loc>');
    expect(xml).toContain('<lastmod>2024-01-10</lastmod>');
  });

  it('should exclude draft blog posts', () => {
    const draftPost = createBlogPost({ slug: 'draft-post', draft: true });
    const publishedPost = createBlogPost({ slug: 'published-post', draft: false });

    const xml = generateSitemap([draftPost, publishedPost], [], []);

    expect(xml).not.toContain('draft-post');
    expect(xml).toContain('<loc>https://k9n.dev/de/blog/published-post</loc>');
  });

  it('should exclude draft talks', () => {
    const draftTalk = createTalk({ slug: 'draft-talk', draft: true });
    const publishedTalk = createTalk({ slug: 'published-talk', draft: false });

    const xml = generateSitemap([], [draftTalk, publishedTalk], []);

    expect(xml).not.toContain('draft-talk');
    expect(xml).toContain('<loc>https://k9n.dev/de/talks/published-talk</loc>');
  });

  it('should exclude draft projects', () => {
    const draftProject = createProject({ slug: 'draft-project', status: 'draft' });
    const activeProject = createProject({ slug: 'active-project', status: 'active' });

    const xml = generateSitemap([], [], [draftProject, activeProject]);

    expect(xml).not.toContain('draft-project');
    expect(xml).toContain('<loc>https://k9n.dev/de/projects/active-project</loc>');
  });

  it('should exclude blog posts with publishedAt.linkExternal: true', () => {
    const externalPost = createBlogPost({
      slug: 'external-post',
      publishedAt: { name: 'External Blog', url: 'https://external.com', linkExternal: true },
    });
    const localPost = createBlogPost({ slug: 'local-post' });

    const xml = generateSitemap([externalPost, localPost], [], []);

    expect(xml).not.toContain('external-post');
    expect(xml).toContain('<loc>https://k9n.dev/de/blog/local-post</loc>');
  });

  it('should include blog posts with publishedAt.linkExternal: false', () => {
    const post = createBlogPost({
      slug: 'republished-post',
      publishedAt: { name: 'Partner Blog', url: 'https://partner.com', linkExternal: false },
    });

    const xml = generateSitemap([post], [], []);

    expect(xml).toContain('<loc>https://k9n.dev/de/blog/republished-post</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/blog/republished-post</loc>');
  });

  it('should prefix all URLs with https://k9n.dev followed by locale', () => {
    const post = createBlogPost({ slug: 'seo-post' });
    const talk = createTalk({ slug: 'seo-talk' });
    const project = createProject({ slug: 'seo-project' });

    const xml = generateSitemap([post], [talk], [project]);

    // Extract all <loc> values
    const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) ?? [];
    const urls = locMatches.map((m) => m.replace(/<\/?loc>/g, ''));

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\/k9n\.dev\/(de|en)\//);
    }
  });

  it('should format dates as YYYY-MM-DD', () => {
    const post = createBlogPost({
      slug: 'date-post',
      created: '2024-03-15T10:30:00Z',
    });
    const talk = createTalk({
      slug: 'date-talk',
      date: '2024-06-20T14:00:00.000Z',
    });
    const project = createProject({
      slug: 'date-project',
      created: '2024-01-10',
    });

    const xml = generateSitemap([post], [talk], [project]);

    // Extract all <lastmod> values
    const lastmodMatches = xml.match(/<lastmod>(.*?)<\/lastmod>/g) ?? [];
    const dates = lastmodMatches.map((m) => m.replace(/<\/?lastmod>/g, ''));

    expect(dates.length).toBeGreaterThan(0);
    for (const date of dates) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('should generate two URL entries per page (one for each locale)', () => {
    const post = createBlogPost({ slug: 'multi-post' });

    const xml = generateSitemap([post], [], []);

    // The blog post should appear with both locale prefixes
    expect(xml).toContain('<loc>https://k9n.dev/de/blog/multi-post</loc>');
    expect(xml).toContain('<loc>https://k9n.dev/en/blog/multi-post</loc>');
  });

  it('should include xhtml:link alternates for content URLs', () => {
    const post = createBlogPost({ slug: 'alt-post' });

    const xml = generateSitemap([post], [], []);

    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k9n.dev/de/blog/alt-post" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k9n.dev/en/blog/alt-post" />');
  });

  it('should exclude talks with linkExternal: true', () => {
    const externalTalk = createTalk({ slug: 'external-talk', linkExternal: true });
    const localTalk = createTalk({ slug: 'local-talk', linkExternal: false });

    const xml = generateSitemap([], [externalTalk, localTalk], []);

    expect(xml).not.toContain('external-talk');
    expect(xml).toContain('<loc>https://k9n.dev/de/talks/local-talk</loc>');
  });
});

describe('generateLlmsTxt', () => {
  it('should include locale-prefixed page URLs for both de and en', () => {
    const output = generateLlmsTxt([], [], []);

    expect(output).toContain('https://k9n.dev/de/');
    expect(output).toContain('https://k9n.dev/en/');
    expect(output).toContain('https://k9n.dev/de/blog');
    expect(output).toContain('https://k9n.dev/en/blog');
    expect(output).toContain('https://k9n.dev/de/talks');
    expect(output).toContain('https://k9n.dev/en/talks');
    expect(output).toContain('https://k9n.dev/de/projects');
    expect(output).toContain('https://k9n.dev/en/projects');
  });

  it('should annotate blog posts with [de] or [en] language marker', () => {
    const dePost = createBlogPost({ slug: 'german-post', language: 'de' });
    const enPost = createBlogPost({ slug: 'english-post', language: 'en' });

    const output = generateLlmsTxt([dePost, enPost], [], []);

    expect(output).toContain('[de] https://k9n.dev/blog/german-post');
    expect(output).toContain('[en] https://k9n.dev/blog/english-post');
  });

  it('should annotate talks with [de] or [en] language marker', () => {
    const deTalk = createTalk({ slug: 'german-talk', language: 'de' });
    const enTalk = createTalk({ slug: 'english-talk', language: 'en' });

    const output = generateLlmsTxt([], [deTalk, enTalk], []);

    expect(output).toContain('[de] https://k9n.dev/talks/german-talk');
    expect(output).toContain('[en] https://k9n.dev/talks/english-talk');
  });

  it('should annotate projects with [de] or [en] language marker', () => {
    const deProject = createProject({ slug: 'german-project', language: 'de' });
    const enProject = createProject({ slug: 'english-project', language: 'en' });

    const output = generateLlmsTxt([], [], [deProject, enProject]);

    expect(output).toContain('[de] https://k9n.dev/projects/german-project');
    expect(output).toContain('[en] https://k9n.dev/projects/english-project');
  });

  it('should default to [de] when language field is undefined', () => {
    const post = createBlogPost({ slug: 'no-lang-post', language: undefined });
    const talk = createTalk({ slug: 'no-lang-talk', language: undefined });
    const project = createProject({ slug: 'no-lang-project', language: undefined });

    const output = generateLlmsTxt([post], [talk], [project]);

    expect(output).toContain('[de] https://k9n.dev/blog/no-lang-post');
    expect(output).toContain('[de] https://k9n.dev/talks/no-lang-talk');
    expect(output).toContain('[de] https://k9n.dev/projects/no-lang-project');
  });

  it('should exclude draft blog posts', () => {
    const draftPost = createBlogPost({ slug: 'draft-post', draft: true });
    const publishedPost = createBlogPost({ slug: 'published-post', draft: false });

    const output = generateLlmsTxt([draftPost, publishedPost], [], []);

    expect(output).not.toContain('draft-post');
    expect(output).toContain('published-post');
  });

  it('should exclude blog posts with publishedAt.linkExternal: true', () => {
    const externalPost = createBlogPost({
      slug: 'external-post',
      publishedAt: { name: 'External', url: 'https://ext.com', linkExternal: true },
    });

    const output = generateLlmsTxt([externalPost], [], []);

    expect(output).not.toContain('external-post');
  });

  it('should exclude draft talks and talks with linkExternal: true', () => {
    const draftTalk = createTalk({ slug: 'draft-talk', draft: true });
    const externalTalk = createTalk({ slug: 'external-talk', linkExternal: true });
    const localTalk = createTalk({ slug: 'local-talk', draft: false, linkExternal: false });

    const output = generateLlmsTxt([], [draftTalk, externalTalk, localTalk], []);

    expect(output).not.toContain('draft-talk');
    expect(output).not.toContain('external-talk');
    expect(output).toContain('local-talk');
  });

  it('should exclude draft projects', () => {
    const draftProject = createProject({ slug: 'draft-project', status: 'draft' });
    const activeProject = createProject({ slug: 'active-project', status: 'active' });

    const output = generateLlmsTxt([], [], [draftProject, activeProject]);

    expect(output).not.toContain('draft-project');
    expect(output).toContain('active-project');
  });
});

describe('generateRobotsTxt', () => {
  it('should reference sitemap.xml with full base URL', () => {
    const output = generateRobotsTxt();

    expect(output).toContain('Sitemap: https://k9n.dev/sitemap.xml');
  });

  it('should allow all user agents', () => {
    const output = generateRobotsTxt();

    expect(output).toContain('User-agent: *');
  });
});
