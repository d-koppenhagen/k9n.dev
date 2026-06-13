import { DEFAULT_LOCALE, SITE_CONFIG, SUPPORTED_LOCALES } from './site.config';

describe('Site Configuration', () => {
  describe('SUPPORTED_LOCALES', () => {
    it('should contain exactly two locales', () => {
      expect(SUPPORTED_LOCALES).toHaveLength(2);
    });

    it('should contain de and en locale codes', () => {
      const codes = SUPPORTED_LOCALES.map(l => l.code);
      expect(codes).toContain('de');
      expect(codes).toContain('en');
    });

    it('should have de as the first locale', () => {
      expect(SUPPORTED_LOCALES[0].code).toBe('de');
    });

    it('should have en as the second locale', () => {
      expect(SUPPORTED_LOCALES[1].code).toBe('en');
    });

    it('should have valid LocaleConfig properties for each locale', () => {
      for (const locale of SUPPORTED_LOCALES) {
        expect(locale.code).toBeDefined();
        expect(locale.label).toBeDefined();
        expect(locale.ogLocale).toBeDefined();
        expect(locale.hreflang).toBeDefined();

        expect(typeof locale.code).toBe('string');
        expect(typeof locale.label).toBe('string');
        expect(typeof locale.ogLocale).toBe('string');
        expect(typeof locale.hreflang).toBe('string');

        expect(locale.label.length).toBeGreaterThan(0);
        expect(locale.ogLocale.length).toBeGreaterThan(0);
        expect(locale.hreflang.length).toBeGreaterThan(0);
      }
    });

    it('should have correct properties for de locale', () => {
      const de = SUPPORTED_LOCALES.find(l => l.code === 'de')!;
      expect(de.label).toBe('Deutsch');
      expect(de.ogLocale).toBe('de_DE');
      expect(de.hreflang).toBe('de');
    });

    it('should have correct properties for en locale', () => {
      const en = SUPPORTED_LOCALES.find(l => l.code === 'en')!;
      expect(en.label).toBe('English');
      expect(en.ogLocale).toBe('en_US');
      expect(en.hreflang).toBe('en');
    });
  });

  describe('DEFAULT_LOCALE', () => {
    it('should be de', () => {
      expect(DEFAULT_LOCALE.code).toBe('de');
    });

    it('should reference the first entry of SUPPORTED_LOCALES', () => {
      expect(DEFAULT_LOCALE).toBe(SUPPORTED_LOCALES[0]);
    });

    it('should be a valid LocaleConfig', () => {
      expect(DEFAULT_LOCALE.code).toBeDefined();
      expect(DEFAULT_LOCALE.label).toBeDefined();
      expect(DEFAULT_LOCALE.ogLocale).toBeDefined();
      expect(DEFAULT_LOCALE.hreflang).toBeDefined();
    });
  });

  describe('SITE_CONFIG', () => {
    it('should have locales set to SUPPORTED_LOCALES', () => {
      expect(SITE_CONFIG.locales).toBe(SUPPORTED_LOCALES);
    });

    it('should have defaultLocale set to DEFAULT_LOCALE', () => {
      expect(SITE_CONFIG.defaultLocale).toBe(DEFAULT_LOCALE);
    });

    it('should have defaultLocale included in locales', () => {
      expect(SITE_CONFIG.locales).toContain(SITE_CONFIG.defaultLocale);
    });

    it('should have a valid baseUrl', () => {
      expect(SITE_CONFIG.baseUrl).toBe('https://k9n.dev');
    });

    it('should have a valid siteName', () => {
      expect(SITE_CONFIG.siteName).toBe('k9n.dev');
    });
  });
});
