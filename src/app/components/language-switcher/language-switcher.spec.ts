import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageSwitcher } from './language-switcher';
import { SUPPORTED_LOCALES } from '../../config/site.config';

describe('LanguageSwitcher', () => {
  let fixture: ComponentFixture<LanguageSwitcher>;
  let nativeElement: HTMLElement;
  let mockLocalStorage: Record<string, string>;
  let mockLocationHref: string;
  let mockPathname: string;

  function createMockDocument(pathname: string) {
    mockPathname = pathname;
    mockLocationHref = '';

    const realDocument = document;

    // Create a proxy that delegates to the real document but overrides defaultView
    return new Proxy(realDocument, {
      get(target, prop) {
        if (prop === 'defaultView') {
          return {
            get location() {
              return {
                get pathname() { return mockPathname; },
                set pathname(value: string) { mockPathname = value; },
                set href(value: string) { mockLocationHref = value; },
                get href() { return `https://k9n.dev${mockPathname}`; },
              };
            },
            get localStorage() {
              return {
                getItem: (key: string) => mockLocalStorage[key] ?? null,
                setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
                removeItem: (key: string) => { delete mockLocalStorage[key]; },
              };
            },
          };
        }
        const value = Reflect.get(target, prop);
        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
    });
  }

  function setup(localeId = 'de', pathname = '/de/blog') {
    mockLocalStorage = {};

    const mockDoc = createMockDocument(pathname);

    TestBed.configureTestingModule({
      imports: [LanguageSwitcher],
      providers: [
        { provide: LOCALE_ID, useValue: localeId },
        { provide: DOCUMENT, useValue: mockDoc },
      ],
    });

    fixture = TestBed.createComponent(LanguageSwitcher);
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  }

  function getLinks(): HTMLAnchorElement[] {
    return Array.from(nativeElement.querySelectorAll('a'));
  }

  describe('aria-current attribute', () => {
    it('should set aria-current="true" on the active locale link when locale is "de"', () => {
      setup('de', '/de/blog');
      const links = getLinks();
      const deLink = links.find(l => l.getAttribute('lang') === 'de')!;
      const enLink = links.find(l => l.getAttribute('lang') === 'en')!;

      expect(deLink.getAttribute('aria-current')).toBe('true');
      expect(enLink.getAttribute('aria-current')).toBeNull();
    });

    it('should set aria-current="true" on the active locale link when locale is "en"', () => {
      setup('en', '/en/blog');
      const links = getLinks();
      const deLink = links.find(l => l.getAttribute('lang') === 'de')!;
      const enLink = links.find(l => l.getAttribute('lang') === 'en')!;

      expect(enLink.getAttribute('aria-current')).toBe('true');
      expect(deLink.getAttribute('aria-current')).toBeNull();
    });
  });

  describe('lang attribute', () => {
    it('should set lang attribute matching the locale code on each link', () => {
      setup('de', '/de/blog');
      const links = getLinks();

      expect(links.length).toBe(SUPPORTED_LOCALES.length);
      for (const locale of SUPPORTED_LOCALES) {
        const link = links.find(l => l.getAttribute('lang') === locale.code);
        expect(link).toBeTruthy();
      }
    });

    it('should have "de" lang on the Deutsch link and "en" lang on the English link', () => {
      setup('de', '/de/');
      const links = getLinks();
      const deLink = links.find(l => l.textContent?.trim() === 'Deutsch')!;
      const enLink = links.find(l => l.textContent?.trim() === 'English')!;

      expect(deLink.getAttribute('lang')).toBe('de');
      expect(enLink.getAttribute('lang')).toBe('en');
    });
  });

  describe('href attribute (locale-swapped path)', () => {
    it('should set correct href on the inactive locale link (de → en)', () => {
      setup('de', '/de/blog/my-post');
      const links = getLinks();
      const enLink = links.find(l => l.getAttribute('lang') === 'en')!;

      expect(enLink.getAttribute('href')).toBe('/en/blog/my-post');
    });

    it('should set correct href on the inactive locale link (en → de)', () => {
      setup('en', '/en/talks');
      const links = getLinks();
      const deLink = links.find(l => l.getAttribute('lang') === 'de')!;

      expect(deLink.getAttribute('href')).toBe('/de/talks');
    });

    it('should set href on the active locale link pointing to the same locale path', () => {
      setup('de', '/de/blog');
      const links = getLinks();
      const deLink = links.find(l => l.getAttribute('lang') === 'de')!;

      expect(deLink.getAttribute('href')).toBe('/de/blog');
    });
  });

  describe('keyboard navigability', () => {
    it('should render native <a> elements that are keyboard-focusable', () => {
      setup('de', '/de/');
      const links = getLinks();

      for (const link of links) {
        expect(link.tagName).toBe('A');
        // Native <a> elements with href are focusable by default (tabindex is not -1)
        expect(link.tabIndex).not.toBe(-1);
      }
    });

    it('should allow tabbing between links', () => {
      setup('de', '/de/');
      const links = getLinks();

      // All links should be tabbable (tabIndex 0 or default)
      expect(links.length).toBeGreaterThan(1);
      for (const link of links) {
        expect(link.tabIndex).toBe(0);
      }
    });

    it('should activate link on Enter key (native anchor behavior)', () => {
      setup('de', '/de/');
      const links = getLinks();
      const enLink = links.find(l => l.getAttribute('lang') === 'en')!;

      // Native <a> elements respond to Enter key — verify it has href (enables keyboard activation)
      expect(enLink.hasAttribute('href')).toBe(true);
    });
  });

  describe('localStorage persistence on click', () => {
    it('should write locale to localStorage when switching to "en"', () => {
      setup('de', '/de/blog');
      const links = getLinks();
      const enLink = links.find(l => l.getAttribute('lang') === 'en')!;

      enLink.click();
      fixture.detectChanges();

      expect(mockLocalStorage['k9n-preferred-locale']).toBe('en');
    });

    it('should write locale to localStorage when switching to "de"', () => {
      setup('en', '/en/blog');
      const links = getLinks();
      const deLink = links.find(l => l.getAttribute('lang') === 'de')!;

      deLink.click();
      fixture.detectChanges();

      expect(mockLocalStorage['k9n-preferred-locale']).toBe('de');
    });
  });
});
