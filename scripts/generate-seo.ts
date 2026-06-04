/**
 * SEO file generation script.
 *
 * Generates sitemap.xml, robots.txt, and llms.txt from content manifests.
 * Functions are pure (accept data as parameters, return strings) for testability.
 *
 * Run via: npx tsx scripts/generate-seo.ts
 * Or integrated into post-build.ts
 */

import type { BlogPost, Project, Talk } from '../src/app/models/content.model';
import { SUPPORTED_LOCALES } from '../src/app/config/site.config';
import { AUTHOR } from '../src/data/author';

const BASE_URL = AUTHOR.url;

export interface SitemapEntry {
  /** The path without locale prefix (e.g., '/blog/my-post') */
  path: string;
  lastmod?: string;
  priority: number;
}

/**
 * Formats a date string to YYYY-MM-DD format.
 * Handles ISO date strings and date-like strings.
 */
function formatDate(dateStr: string): string {
  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Try to parse and extract date portion
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  // Fallback: return first 10 chars (YYYY-MM-DD)
  return dateStr.slice(0, 10);
}

/**
 * Escapes special XML characters in a string.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates a sitemap.xml string from content data.
 *
 * Includes:
 * - Static pages (home, blog, talks, projects, contact, imprint) with correct priorities
 * - Individual blog post, talk, and project URLs with lastmod dates
 *
 * Excludes:
 * - Blog posts with draft: true
 * - Talks with draft: true
 * - Projects with status: "draft"
 * - Blog posts with publishedAt.linkExternal: true (external articles)
 * - Talks with linkExternal: true (external talks)
 */
export function generateSitemap(
  posts: BlogPost[],
  talks: Talk[],
  projects: Project[],
): string {
  const entries: SitemapEntry[] = [];

  // Static pages
  entries.push({ path: '/', priority: 1.0 });
  entries.push({ path: '/blog', priority: 0.8 });
  entries.push({ path: '/talks', priority: 0.8 });
  entries.push({ path: '/projects', priority: 0.8 });
  entries.push({ path: '/contact', priority: 0.6 });
  entries.push({ path: '/imprint', priority: 0.6 });

  // Blog posts (exclude drafts and externally published)
  for (const post of posts) {
    if (post.draft) continue;
    if (post.publishedAt?.linkExternal) continue;

    const lastmod = post.updated
      ? formatDate(post.updated)
      : formatDate(post.created);

    entries.push({
      path: `/blog/${post.slug}`,
      lastmod,
      priority: 0.6,
    });
  }

  // Talks (exclude drafts and externally published)
  for (const talk of talks) {
    if (talk.draft) continue;
    if (talk.linkExternal) continue;

    entries.push({
      path: `/talks/${talk.slug}`,
      lastmod: formatDate(talk.date),
      priority: 0.6,
    });
  }

  // Projects (exclude drafts)
  for (const project of projects) {
    if (project.status === 'draft') continue;

    entries.push({
      path: `/projects/${project.slug}`,
      lastmod: formatDate(project.created),
      priority: 0.6,
    });
  }

  return buildSitemapXml(entries);
}

/**
 * Generates a robots.txt string.
 *
 * Permits all crawlers to access all paths (no Disallow rules)
 * and references the sitemap location.
 *
 * Conforms to the Robots Exclusion Protocol syntax (one directive per line, Field: Value).
 */
export function generateRobotsTxt(): string {
  return `User-agent: *\nSitemap: ${BASE_URL}/sitemap.xml\n`;
}

/**
 * Generates a llms.txt file following the llms.txt specification format.
 *
 * Includes:
 * - Title line with site name
 * - Description line summarizing the site purpose
 * - Author section with name and contact URL
 * - Pages section with locale-prefixed top-level pages (home, blog, talks, projects)
 * - Blog Posts section with all published blog post URLs annotated with content language
 * - Talks section with all published talk URLs annotated with content language
 * - Projects section with all active project URLs annotated with content language
 *
 * Excludes:
 * - Blog posts with draft: true
 * - Blog posts with publishedAt.linkExternal: true (no local page exists)
 * - Talks with draft: true
 * - Talks with linkExternal: true
 * - Projects with status: "draft"
 */
export function generateLlmsTxt(
  posts: BlogPost[],
  talks: Talk[],
  projects: Project[],
): string {
  const lines: string[] = [];

  // Title
  lines.push('# k9n.dev');
  lines.push('');

  // Description
  lines.push(
    `> ${AUTHOR.llmsDescription}`,
  );
  lines.push('');

  // Author section
  lines.push('## Author');
  lines.push('');
  lines.push(`- ${AUTHOR.name}`);
  lines.push(`- ${BASE_URL}/contact`);
  lines.push('');

  // Pages section with locale-prefixed URLs
  lines.push('## Pages');
  lines.push('');
  for (const locale of SUPPORTED_LOCALES) {
    lines.push(`- ${BASE_URL}/${locale.code}/`);
    lines.push(`- ${BASE_URL}/${locale.code}/blog`);
    lines.push(`- ${BASE_URL}/${locale.code}/talks`);
    lines.push(`- ${BASE_URL}/${locale.code}/projects`);
  }
  lines.push('');

  // Blog Posts section with language annotations
  lines.push('## Blog Posts');
  lines.push('');

  for (const post of posts) {
    if (post.draft) continue;
    if (post.publishedAt?.linkExternal) continue;

    const lang = post.language ?? 'de';
    lines.push(`- [${lang}] ${BASE_URL}/blog/${post.slug}`);
  }

  lines.push('');

  // Talks section with language annotations
  lines.push('## Talks');
  lines.push('');

  for (const talk of talks) {
    if (talk.draft) continue;
    if (talk.linkExternal) continue;

    const lang = talk.language ?? 'de';
    lines.push(`- [${lang}] ${BASE_URL}/talks/${talk.slug}`);
  }

  lines.push('');

  // Projects section with language annotations
  lines.push('## Projects');
  lines.push('');

  for (const project of projects) {
    if (project.status === 'draft') continue;

    const lang = project.language ?? 'de';
    lines.push(`- [${lang}] ${BASE_URL}/projects/${project.slug}`);
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * Builds the XML string from sitemap entries with multilingual xhtml:link alternates.
 * Each entry produces one <url> per supported locale, with hreflang alternate links.
 */
function buildSitemapXml(entries: SitemapEntry[]): string {
  const urlElements: string[] = [];

  for (const entry of entries) {
    for (const locale of SUPPORTED_LOCALES) {
      const loc = `${BASE_URL}/${locale.code}${entry.path}`;
      let xml = '  <url>\n';
      xml += `    <loc>${escapeXml(loc)}</loc>\n`;
      if (entry.lastmod) {
        xml += `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n`;
      }
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;

      // Add xhtml:link alternates for all supported locales
      for (const altLocale of SUPPORTED_LOCALES) {
        const altHref = `${BASE_URL}/${altLocale.code}${entry.path}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLocale.hreflang}" href="${escapeXml(altHref)}" />\n`;
      }

      xml += '  </url>';
      urlElements.push(xml);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements.join('\n')}
</urlset>
`;
}
