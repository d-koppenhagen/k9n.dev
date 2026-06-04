import { AUTHOR } from '../../data/author';

/**
 * Locale configuration for supported languages.
 */
export interface LocaleConfig {
  code: 'de' | 'en';
  label: string;
  ogLocale: string;
  hreflang: string;
}

/**
 * All supported locales for the site.
 */
export const SUPPORTED_LOCALES: readonly LocaleConfig[] = [
  { code: 'de', label: 'Deutsch', ogLocale: 'de_DE', hreflang: 'de' },
  { code: 'en', label: 'English', ogLocale: 'en_US', hreflang: 'en' },
] as const;

/**
 * Default locale (German).
 */
export const DEFAULT_LOCALE: LocaleConfig = SUPPORTED_LOCALES[0];

/**
 * Central site configuration.
 * Used by both the Angular app (runtime) and build scripts.
 */
export const SITE_CONFIG = {
  baseUrl: AUTHOR.url,
  siteName: AUTHOR.siteName,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  author: {
    name: AUTHOR.name,
    mail: AUTHOR.email,
  },
} as const;

/**
 * Ensures a URL is absolute by prepending the site base URL if needed.
 * Already-absolute URLs (starting with http:// or https://) are returned unchanged.
 */
export function toAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Strip leading slash to avoid double slashes
  const path = url.startsWith('/') ? url.slice(1) : url;
  return `${SITE_CONFIG.baseUrl}/${path}`;
}
