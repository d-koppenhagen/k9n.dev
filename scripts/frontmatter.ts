/**
 * Frontmatter parsing and validation module.
 *
 * Parses YAML frontmatter from markdown content files and validates
 * required fields for each content type (blog, talks, projects).
 *
 * Run as part of the build-content pipeline.
 */

import matter from 'gray-matter';
import { readFileSync } from 'node:fs';
import { basename, dirname } from 'node:path';

import type { Author, BlogPost, ExternalLink, LinkedPlatform, Project, PublishedAt, Talk, Thumbnail } from '../src/app/models/content.model';
import { AUTHOR } from '../src/data/author';

const DEFAULT_AUTHOR: Author = {
  name: AUTHOR.name,
  mail: AUTHOR.email,
};

/**
 * Derives a slug from a file path.
 * - Folder-based (README.md): uses parent directory name as slug.
 *   E.g. "src/content/blog/2025-11-aria-live/README.md" → "2025-11-aria-live"
 * - Flat (.md file): removes the .md extension.
 *   E.g. "2025-05-angular20.md" → "2025-05-angular20"
 */
export function deriveSlug(filePath: string): string {
  const filename = basename(filePath);
  if (filename === 'README.md') {
    return basename(dirname(filePath));
  }
  return basename(filePath, '.md');
}

/**
 * Parses and validates a blog post markdown file.
 * Returns null (with a warning log) if the file is invalid.
 */
export function parseBlogPost(filePath: string): BlogPost | null {
  const raw = readFileSafe(filePath);
  if (raw === null) return null;

  const parsed = parseFrontmatter(filePath, raw);
  if (parsed === null) return null;

  const { data, content } = parsed;

  // Validate required fields
  if (!data.title) {
    console.warn(`[frontmatter] Skipping blog post "${filePath}": missing required field "title"`);
    return null;
  }
  if (!data.created) {
    console.warn(`[frontmatter] Skipping blog post "${filePath}": missing required field "created"`);
    return null;
  }

  const author: Author = data.author && data.author.name
    ? { name: data.author.name, mail: data.author.mail || DEFAULT_AUTHOR.mail }
    : DEFAULT_AUTHOR;

  const slug = deriveSlug(filePath);
  const thumbnail = parseThumbnail(data.thumbnail, slug);
  const draft = data.published === false || data.draft === true;
  const publishedAt = parsePublishedAt(data.publishedAt);
  const linked = parseLinked(data.linked);

  return {
    slug,
    title: String(data.title),
    description: data.description ? String(data.description) : '',
    author,
    created: toISODate(data.created),
    updated: data.updated ? toISODate(data.updated) : undefined,
    keywords: parseKeywords(data.keywords),
    thumbnail,
    series: data.series ? String(data.series) : undefined,
    draft,
    language: data.language === 'de' || data.language === 'en' ? data.language : undefined,
    publishedAt,
    linked: linked.length > 0 ? linked : undefined,
    content,
    headings: [],
  };
}

/**
 * Parses and validates a talk markdown file.
 * Returns null (with a warning log) if the file is invalid.
 *
 * Handles two frontmatter patterns:
 * - New format: `date` + `event` fields
 * - Legacy format: `created` as date + `publishedAt.name` as event
 */
export function parseTalk(filePath: string): Talk | null {
  const raw = readFileSafe(filePath);
  if (raw === null) return null;

  const parsed = parseFrontmatter(filePath, raw);
  if (parsed === null) return null;

  const { data, content } = parsed;

  // Validate required fields
  if (!data.title) {
    console.warn(`[frontmatter] Skipping talk "${filePath}": missing required field "title"`);
    return null;
  }

  // Resolve date: prefer `date`, fall back to `created`
  const dateValue = data.date || data.created;
  if (!dateValue) {
    console.warn(`[frontmatter] Skipping talk "${filePath}": missing required field "date"`);
    return null;
  }

  // Resolve event: prefer `event`, fall back to `publishedAt.name`
  const eventValue = data.event || (data.publishedAt && data.publishedAt.name);
  if (!eventValue) {
    console.warn(`[frontmatter] Skipping talk "${filePath}": missing required field "event"`);
    return null;
  }

  const slug = deriveSlug(filePath);
  const thumbnail = parseThumbnail(data.thumbnail, slug, 'images/talks');
  const draft = data.published === false || data.draft === true;
  const links = parseLinks(data.links, data.publishedAt);
  const linkExternal = !!(data.publishedAt && typeof data.publishedAt === 'object'
    && (data.publishedAt as Record<string, unknown>).linkExternal === true);
  const publishedAt = parsePublishedAt(data.publishedAt);
  const linked = parseLinked(data.linked);

  const language = parseContentLanguage(data.language, filePath, 'talk');

  return {
    slug,
    title: String(data.title),
    description: data.description ? String(data.description) : '',
    date: toISODate(dateValue),
    event: String(eventValue),
    keywords: parseKeywords(data.keywords),
    thumbnail,
    links: links.length > 0 ? links : undefined,
    draft,
    linkExternal: linkExternal || undefined,
    language,
    publishedAt,
    linked: linked.length > 0 ? linked : undefined,
    content, // Raw markdown body
  };
}

/**
 * Parses and validates a project markdown file.
 * Returns null (with a warning log) if the file is invalid.
 */
export function parseProject(filePath: string): Project | null {
  const raw = readFileSafe(filePath);
  if (raw === null) return null;

  const parsed = parseFrontmatter(filePath, raw);
  if (parsed === null) return null;

  const { data, content } = parsed;

  // Validate required fields
  if (!data.title) {
    console.warn(`[frontmatter] Skipping project "${filePath}": missing required field "title"`);
    return null;
  }

  // For projects, `created` or `updated` can serve as the date
  const createdValue = data.created || data.updated;
  if (!createdValue) {
    console.warn(`[frontmatter] Skipping project "${filePath}": missing required field "created"`);
    return null;
  }

  const slug = deriveSlug(filePath);
  const thumbnail = parseThumbnail(data.thumbnail, slug, 'images/projects');
  const draft = data.published === false || data.status === 'draft';
  const status = parseProjectStatus(data.status, draft);
  const publishedAt = parsePublishedAt(data.publishedAt);
  const linked = parseLinked(data.linked);

  const language = parseContentLanguage(data.language, filePath, 'project');

  return {
    slug,
    title: String(data.title),
    description: data.description ? String(data.description) : '',
    created: toISODate(createdValue),
    url: data.url ? String(data.url) : undefined,
    keywords: parseKeywords(data.keywords),
    thumbnail,
    status,
    language,
    publishedAt,
    linked: linked.length > 0 ? linked : undefined,
    content, // Raw markdown body
  };
}

// --- Helper functions ---

/**
 * Reads a file safely, returning null if the file cannot be read.
 */
function readFileSafe(filePath: string): string | null {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`[frontmatter] Skipping "${filePath}": unable to read file — ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

/**
 * Parses frontmatter from raw file content using gray-matter.
 * Returns null if YAML is malformed.
 */
function parseFrontmatter(filePath: string, raw: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const { data, content } = matter(raw);
    return { data: data as Record<string, unknown>, content };
  } catch (error) {
    console.warn(`[frontmatter] Skipping "${filePath}": malformed YAML frontmatter — ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

/**
 * Converts a date value (string, Date, or number) to an ISO date string (YYYY-MM-DD).
 */
function toISODate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (typeof value === 'string') {
    // If it's already an ISO date string (YYYY-MM-DD), return as-is
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    // Try to parse and normalize
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return value;
  }
  if (typeof value === 'number') {
    return new Date(value).toISOString().split('T')[0];
  }
  return String(value);
}

/**
 * Parses a thumbnail object from frontmatter data.
 * Resolves relative paths (./file.jpg) using the slug and imageBasePath to construct the served path.
 * Returns root-relative paths (e.g. /images/blog/<slug>/file.jpg) for local images,
 * or the original absolute URL for external images.
 *
 * @param data - Raw thumbnail data from frontmatter
 * @param slug - Optional slug for resolving relative paths (e.g. "2025-11-aria-live")
 * @param imageBasePath - Base path for images (e.g. "images/blog", "images/talks", "images/projects")
 */
function parseThumbnail(data: unknown, slug?: string, imageBasePath = 'images/blog'): Thumbnail | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const obj = data as Record<string, unknown>;
  if (!obj.header) return undefined;

  const resolveUrl = (url: string): string => {
    // Already an absolute URL (external) — return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Relative path: ./file.jpg → <imageBasePath>/<slug>/file.jpg
    if (url.startsWith('./') && slug) {
      const filename = url.slice(2); // strip "./"
      return `${imageBasePath}/${slug}/${filename}`;
    }
    // Legacy path without ./ prefix (shouldn't exist after migration, but handle gracefully)
    const path = url.startsWith('/') ? url.slice(1) : url;
    return path;
  };

  return {
    header: resolveUrl(String(obj.header)),
    card: obj.card ? resolveUrl(String(obj.card)) : undefined,
  };
}

/**
 * Parses keywords array from frontmatter data.
 */
function parseKeywords(data: unknown): string[] {
  if (!Array.isArray(data)) return [];
  return data.map((k) => String(k));
}

/**
 * Parses a publishedAt object from frontmatter data for blog posts.
 */
function parsePublishedAt(data: unknown): PublishedAt | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const obj = data as Record<string, unknown>;
  if (!obj.name || !obj.url) return undefined;
  return {
    name: String(obj.name),
    url: String(obj.url),
    logo: obj.logo ? String(obj.logo) : undefined,
    linkExternal: obj.linkExternal === true ? true : undefined,
  };
}

/**
 * Known platform keys mapped to human-readable labels.
 */
const PLATFORM_LABELS: Record<string, string> = {
  devTo: 'DEV.to',
  medium: 'Medium',
  hashnode: 'Hashnode',
  twitter: 'Twitter',
};

/**
 * Parses the `linked` field from frontmatter.
 * The field is a record of platform keys to URLs (e.g. { devTo: "...", medium: "..." }).
 * Returns a normalized array of LinkedPlatform objects.
 */
function parseLinked(data: unknown): LinkedPlatform[] {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return [];
  const obj = data as Record<string, unknown>;
  const result: LinkedPlatform[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.trim()) {
      result.push({
        platform: key,
        url: value.trim(),
        label: PLATFORM_LABELS[key] ?? key,
      });
    }
  }

  return result;
}

/**
 * Parses external links for talks.
 * Combines explicit `links` array with `publishedAt` data.
 */
function parseLinks(links: unknown, publishedAt: unknown): ExternalLink[] {
  const result: ExternalLink[] = [];

  // Parse explicit links array
  if (Array.isArray(links)) {
    for (const link of links) {
      if (link && typeof link === 'object' && 'url' in link) {
        result.push({
          url: String((link as Record<string, unknown>).url),
          label: (link as Record<string, unknown>).label ? String((link as Record<string, unknown>).label) : 'Link',
        });
      }
    }
  }

  // Add publishedAt as an external link if it has a URL
  if (publishedAt && typeof publishedAt === 'object') {
    const pub = publishedAt as Record<string, unknown>;
    if (pub.url && pub.linkExternal) {
      result.push({
        url: String(pub.url),
        label: pub.name ? String(pub.name) : 'External',
      });
    }
  }

  return result;
}

/**
 * Parses and validates the language field from frontmatter data.
 * Returns 'de' or 'en' if valid, defaults to 'de' if absent,
 * and logs a warning and defaults to 'de' if invalid.
 */
function parseContentLanguage(value: unknown, filePath: string, contentType: string): 'de' | 'en' {
  if (value === undefined || value === null) {
    return 'de';
  }
  if (value === 'de' || value === 'en') {
    return value;
  }
  console.warn(`[frontmatter] Invalid language "${value}" in ${contentType} "${filePath}": must be "de" or "en". Defaulting to "de".`);
  return 'de';
}

/**
 * Resolves the project status from frontmatter data.
 */
function parseProjectStatus(status: unknown, isDraft: boolean): 'active' | 'maintained' | 'archived' | 'draft' {
  if (isDraft) return 'draft';
  if (status === 'active' || status === 'maintained' || status === 'archived' || status === 'draft') {
    return status;
  }
  // Default to 'active' if no status specified
  return 'active';
}

// --- Duplicate slug tracking ---

export interface DuplicateTracker {
  seen: Map<string, string>; // slug → first file path
}

/**
 * Creates a new duplicate tracker.
 */
export function createDuplicateTracker(): DuplicateTracker {
  return { seen: new Map() };
}

/**
 * Checks if a slug has already been seen. If so, logs a warning and returns true.
 * Otherwise, registers the slug and returns false.
 */
export function isDuplicateSlug(tracker: DuplicateTracker, slug: string, filePath: string): boolean {
  const existing = tracker.seen.get(slug);
  if (existing) {
    console.warn(`[frontmatter] Duplicate slug "${slug}" found in "${filePath}" — already defined in "${existing}". Using first occurrence.`);
    return true;
  }
  tracker.seen.set(slug, filePath);
  return false;
}
