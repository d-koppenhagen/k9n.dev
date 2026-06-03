export interface Author {
  name: string;
  mail: string;
}

export interface Thumbnail {
  header: string;
  card?: string;
}

export interface ExternalLink {
  url: string;
  label: string;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PublishedAt {
  name: string;
  url: string;
  logo?: string;
  linkExternal?: boolean;
}

export interface LinkedPlatform {
  platform: string;
  url: string;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: Author;
  created: string; // ISO date
  updated?: string; // ISO date
  keywords: string[];
  thumbnail?: Thumbnail;
  series?: string;
  draft: boolean;
  language?: 'de' | 'en';
  publishedAt?: PublishedAt;
  linked?: LinkedPlatform[];
  content: string; // Pre-rendered HTML
  headings: Heading[]; // For TOC generation
}

export interface Talk {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  event: string;
  keywords: string[];
  thumbnail?: Thumbnail;
  links?: ExternalLink[];
  draft: boolean;
  linkExternal?: boolean;
  language?: 'de' | 'en';
  publishedAt?: PublishedAt;
  linked?: LinkedPlatform[];
  content: string; // Pre-rendered HTML
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  created: string; // ISO date
  url?: string;
  keywords: string[];
  thumbnail?: Thumbnail;
  status: 'active' | 'maintained' | 'archived' | 'draft';
  language?: 'de' | 'en';
  publishedAt?: PublishedAt;
  linked?: LinkedPlatform[];
  content: string; // Pre-rendered HTML
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface PageMetaImage {
  url: string;
  width?: number;  // pixels, 1–4096
  height?: number; // pixels, 1–4096
}

export interface PageMeta {
  // Required
  title: string;        // max 70 characters
  description: string;  // max 160 characters
  url: string;          // absolute URL of the page

  // Optional
  type?: 'website' | 'article';
  image?: PageMetaImage;
  imageAlt?: string;    // max 125 characters
  locale?: string;      // e.g. "de_DE"
  siteName?: string;
  author?: string;
  publishedTime?: string;  // ISO 8601
  modifiedTime?: string;   // ISO 8601
  keywords?: string[];     // max 10 items
  canonicalUrl?: string;
  draft?: boolean;
}
