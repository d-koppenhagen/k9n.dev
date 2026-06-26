/**
 * Central author data – Single Source of Truth.
 *
 * To update personal information, edit `src/data/author.json`.
 * The JSON is importable everywhere (Angular browser build + Node scripts).
 */

import authorJson from './author.json';

// --- Types ---

export interface LocalizedText {
  de: string;
  en: string;
}

export interface SocialProfile {
  url: string;
  handle: string;
}

export interface AuthorImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface AtprotoConfig {
  did: string;
  publicationRkey: string;
}

export interface AuthorData {
  name: string;
  email: string;
  url: string;
  siteName: string;
  jobTitle: LocalizedText;
  company: string;
  tagline: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  llmsDescription: string;
  bio: {
    de: string[];
    en: string[];
  };
  atproto: AtprotoConfig;
  social: {
    github: SocialProfile;
    bluesky: SocialProfile;
    linkedin: SocialProfile;
    mastodon: SocialProfile;
    xing: SocialProfile;
  };
  legal: {
    address: string;
    phone: string;
  };
  image: AuthorImage;
}

// --- Data ---

export const AUTHOR: AuthorData = authorJson;
