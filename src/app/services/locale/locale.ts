import { DEFAULT_LOCALE, type LocaleConfig, SUPPORTED_LOCALES } from '../../config/site.config';

/**
 * Resolves a locale code to a supported LocaleConfig, falling back to default.
 * Matches exact codes ('de', 'en') and regional variants ('de-AT', 'en-US').
 */
export function resolveLocale(code: string | null | undefined): LocaleConfig {
  if (!code) {
    return DEFAULT_LOCALE;
  }

  const normalized = code.toLowerCase();

  for (const locale of SUPPORTED_LOCALES) {
    if (normalized === locale.code || normalized.startsWith(`${locale.code}-`)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Detects preferred locale from browser languages (navigator.languages).
 * Iterates the language list and resolves the first supported match.
 * Falls back to default locale if no match is found.
 */
export function detectBrowserLocale(languages: readonly string[]): LocaleConfig {
  for (const lang of languages) {
    const resolved = resolveLocale(lang);
    if (resolved !== DEFAULT_LOCALE || lang.toLowerCase() === DEFAULT_LOCALE.code || lang.toLowerCase().startsWith(`${DEFAULT_LOCALE.code}-`)) {
      return resolved;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Swaps the locale prefix in a given URL path.
 * Replaces the existing locale prefix with the target locale's code.
 */
export function swapLocaleInPath(currentPath: string, targetLocale: LocaleConfig): string {
  const existing = extractLocaleFromPath(currentPath);

  if (!existing) {
    return addLocalePrefix(currentPath, targetLocale);
  }

  // Replace the locale prefix segment
  const withoutLocale = currentPath.slice(`/${existing.code}`.length);
  return `/${targetLocale.code}${withoutLocale}`;
}

/**
 * Adds locale prefix to a bare path (no existing prefix).
 * Prepends the locale code as the first path segment.
 */
export function addLocalePrefix(path: string, locale: LocaleConfig): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale.code}${normalizedPath}`;
}

/**
 * Extracts the locale prefix from a path, or returns null if none.
 * Checks if the path starts with a supported locale code segment.
 */
export function extractLocaleFromPath(path: string): LocaleConfig | null {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  for (const locale of SUPPORTED_LOCALES) {
    const prefix = `/${locale.code}`;
    if (normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)) {
      return locale;
    }
  }

  return null;
}
