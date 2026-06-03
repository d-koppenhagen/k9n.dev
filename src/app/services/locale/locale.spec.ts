import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../config/site.config';
import {
  addLocalePrefix,
  detectBrowserLocale,
  extractLocaleFromPath,
  resolveLocale,
  swapLocaleInPath,
} from './locale';

describe('Locale Resolution Utility', () => {
  const deLocale = SUPPORTED_LOCALES.find(l => l.code === 'de')!;
  const enLocale = SUPPORTED_LOCALES.find(l => l.code === 'en')!;

  describe('resolveLocale', () => {
    it('should resolve exact code "de" to de locale', () => {
      const result = resolveLocale('de');
      expect(result.code).toBe('de');
    });

    it('should resolve exact code "en" to en locale', () => {
      const result = resolveLocale('en');
      expect(result.code).toBe('en');
    });

    it('should resolve regional variant "de-AT" to de locale', () => {
      const result = resolveLocale('de-AT');
      expect(result.code).toBe('de');
    });

    it('should resolve regional variant "en-US" to en locale', () => {
      const result = resolveLocale('en-US');
      expect(result.code).toBe('en');
    });

    it('should resolve regional variant "en-GB" to en locale', () => {
      const result = resolveLocale('en-GB');
      expect(result.code).toBe('en');
    });

    it('should resolve unsupported code "fr" to default locale', () => {
      const result = resolveLocale('fr');
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should resolve unsupported code "es" to default locale', () => {
      const result = resolveLocale('es');
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should resolve unsupported code "ja" to default locale', () => {
      const result = resolveLocale('ja');
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should resolve null to default locale', () => {
      const result = resolveLocale(null);
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should resolve undefined to default locale', () => {
      const result = resolveLocale(undefined);
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should always return a valid LocaleConfig', () => {
      const inputs = ['de', 'en', 'de-AT', 'en-US', 'fr', 'es', 'ja', null, undefined];
      for (const input of inputs) {
        const result = resolveLocale(input);
        expect(result.code).toBeDefined();
        expect(result.label).toBeDefined();
        expect(result.ogLocale).toBeDefined();
        expect(result.hreflang).toBeDefined();
      }
    });
  });

  describe('detectBrowserLocale', () => {
    it('should detect "en" from ["en-US", "de"]', () => {
      const result = detectBrowserLocale(['en-US', 'de']);
      expect(result.code).toBe('en');
    });

    it('should detect "de" from ["fr", "de-AT"]', () => {
      const result = detectBrowserLocale(['fr', 'de-AT']);
      expect(result.code).toBe('de');
    });

    it('should fall back to default locale from ["fr", "ja"]', () => {
      const result = detectBrowserLocale(['fr', 'ja']);
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should return default locale for empty array', () => {
      const result = detectBrowserLocale([]);
      expect(result).toBe(DEFAULT_LOCALE);
    });

    it('should return de locale when "de" is first supported match', () => {
      const result = detectBrowserLocale(['de', 'en']);
      expect(result.code).toBe('de');
    });
  });

  describe('swapLocaleInPath', () => {
    it('should swap /de/blog/my-post to /en/blog/my-post', () => {
      const result = swapLocaleInPath('/de/blog/my-post', enLocale);
      expect(result).toBe('/en/blog/my-post');
    });

    it('should swap /en/blog/my-post to /de/blog/my-post', () => {
      const result = swapLocaleInPath('/en/blog/my-post', deLocale);
      expect(result).toBe('/de/blog/my-post');
    });

    it('should swap /de/ to /en/', () => {
      const result = swapLocaleInPath('/de/', enLocale);
      expect(result).toBe('/en/');
    });

    it('should swap /en/ to /de/', () => {
      const result = swapLocaleInPath('/en/', deLocale);
      expect(result).toBe('/de/');
    });

    it('should preserve query params when swapping', () => {
      const result = swapLocaleInPath('/de/blog/my-post?page=2', enLocale);
      expect(result).toBe('/en/blog/my-post?page=2');
    });

    it('should preserve fragments when swapping', () => {
      const result = swapLocaleInPath('/de/blog/my-post#section', enLocale);
      expect(result).toBe('/en/blog/my-post#section');
    });

    it('should add locale prefix to path without locale', () => {
      const result = swapLocaleInPath('/blog/my-post', enLocale);
      expect(result).toBe('/en/blog/my-post');
    });
  });

  describe('addLocalePrefix', () => {
    it('should prepend de locale to /blog', () => {
      const result = addLocalePrefix('/blog', deLocale);
      expect(result).toBe('/de/blog');
    });

    it('should prepend en locale to /blog', () => {
      const result = addLocalePrefix('/blog', enLocale);
      expect(result).toBe('/en/blog');
    });

    it('should prepend de locale to /', () => {
      const result = addLocalePrefix('/', deLocale);
      expect(result).toBe('/de/');
    });

    it('should prepend en locale to /', () => {
      const result = addLocalePrefix('/', enLocale);
      expect(result).toBe('/en/');
    });

    it('should handle path without leading slash', () => {
      const result = addLocalePrefix('blog/post', deLocale);
      expect(result).toBe('/de/blog/post');
    });
  });

  describe('extractLocaleFromPath', () => {
    it('should extract de from /de/blog', () => {
      const result = extractLocaleFromPath('/de/blog');
      expect(result).not.toBeNull();
      expect(result!.code).toBe('de');
    });

    it('should extract en from /en/talks', () => {
      const result = extractLocaleFromPath('/en/talks');
      expect(result).not.toBeNull();
      expect(result!.code).toBe('en');
    });

    it('should return null for /blog (no locale prefix)', () => {
      const result = extractLocaleFromPath('/blog');
      expect(result).toBeNull();
    });

    it('should return null for /fr/blog (unsupported locale)', () => {
      const result = extractLocaleFromPath('/fr/blog');
      expect(result).toBeNull();
    });

    it('should extract de from /de (exact prefix match)', () => {
      const result = extractLocaleFromPath('/de');
      expect(result).not.toBeNull();
      expect(result!.code).toBe('de');
    });

    it('should extract en from /en/', () => {
      const result = extractLocaleFromPath('/en/');
      expect(result).not.toBeNull();
      expect(result!.code).toBe('en');
    });
  });
});
