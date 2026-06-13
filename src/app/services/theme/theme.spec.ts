import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Theme } from './theme';

describe('Theme', () => {
  let service: Theme;
  let mockDocument: Document;
  let mockLocalStorage: Record<string, string>;
  let mediaQueryListeners: ((event: MediaQueryListEvent) => void)[];
  let mockMediaQueryMatches: boolean;

  function createMockMediaQueryList(matches: boolean): MediaQueryList {
    return {
      matches,
      media: '(prefers-color-scheme: dark)',
      addEventListener: (_event: string, listener: (event: MediaQueryListEvent) => void) => {
        mediaQueryListeners.push(listener);
      },
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
  }

  beforeEach(() => {
    mockLocalStorage = {};
    mediaQueryListeners = [];
    mockMediaQueryMatches = false;

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
        removeItem: (key: string) => { delete mockLocalStorage[key]; },
      },
      writable: true,
      configurable: true,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: () => createMockMediaQueryList(mockMediaQueryMatches),
      writable: true,
      configurable: true,
    });
  });

  function setupService(platformId = 'browser') {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });
    service = TestBed.inject(Theme);
    mockDocument = TestBed.inject(DOCUMENT);
  }

  describe('initialization', () => {
    it('should default to system preference when no persisted value exists', () => {
      setupService();
      expect(service.preference()).toBe('system');
    });

    it('should resolve to light when system prefers light', () => {
      mockMediaQueryMatches = false;
      setupService();
      expect(service.theme()).toBe('light');
    });

    it('should resolve to dark when system prefers dark', () => {
      mockMediaQueryMatches = true;
      setupService();
      expect(service.theme()).toBe('dark');
    });

    it('should set data-theme attribute on document root', () => {
      mockMediaQueryMatches = false;
      setupService();
      expect(mockDocument.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should load persisted preference from localStorage', () => {
      mockLocalStorage['theme-preference'] = 'dark';
      setupService();
      expect(service.preference()).toBe('dark');
      expect(service.theme()).toBe('dark');
    });

    it('should discard invalid persisted values', () => {
      mockLocalStorage['theme-preference'] = 'invalid-value';
      setupService();
      expect(service.preference()).toBe('system');
    });

    it('should remove invalid persisted values from localStorage', () => {
      mockLocalStorage['theme-preference'] = 'garbage';
      setupService();
      expect(mockLocalStorage['theme-preference']).toBeUndefined();
    });
  });

  describe('setTheme()', () => {
    beforeEach(() => {
      setupService();
    });

    it('should update userPreference signal', () => {
      service.setTheme('dark');
      expect(service.preference()).toBe('dark');
    });

    it('should resolve theme to dark when preference is dark', () => {
      service.setTheme('dark');
      expect(service.theme()).toBe('dark');
    });

    it('should resolve theme to light when preference is light', () => {
      service.setTheme('light');
      expect(service.theme()).toBe('light');
    });

    it('should resolve theme based on system preference when set to system', () => {
      mockMediaQueryMatches = true;
      // Re-mock matchMedia to return dark
      Object.defineProperty(window, 'matchMedia', {
        value: () => createMockMediaQueryList(true),
        writable: true,
        configurable: true,
      });
      service.setTheme('system');
      expect(service.theme()).toBe('dark');
    });

    it('should set data-theme attribute on document root', () => {
      service.setTheme('dark');
      expect(mockDocument.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist preference to localStorage', () => {
      service.setTheme('dark');
      expect(mockLocalStorage['theme-preference']).toBe('dark');
    });
  });

  describe('system preference changes', () => {
    it('should update resolved theme when system preference changes and user preference is system', () => {
      mockMediaQueryMatches = false;
      setupService();
      expect(service.theme()).toBe('light');

      // Update the mock to reflect the new system preference before firing the listener
      mockMediaQueryMatches = true;
      Object.defineProperty(window, 'matchMedia', {
        value: () => createMockMediaQueryList(true),
        writable: true,
        configurable: true,
      });

      // Simulate system preference change
      const event = { matches: true } as MediaQueryListEvent;
      mediaQueryListeners.forEach(listener => listener(event));

      expect(service.theme()).toBe('dark');
    });

    it('should NOT update resolved theme when system preference changes and user preference is explicit', () => {
      setupService();
      service.setTheme('light');

      // Simulate system preference change
      const event = { matches: true } as MediaQueryListEvent;
      mediaQueryListeners.forEach(listener => listener(event));

      expect(service.theme()).toBe('light');
    });
  });

  describe('SSR fallback', () => {
    it('should default to light theme on server platform', () => {
      setupService('server');
      expect(service.theme()).toBe('light');
      expect(service.preference()).toBe('system');
    });

    it('should not throw when localStorage is unavailable', () => {
      Object.defineProperty(window, 'localStorage', {
        get: () => { throw new Error('localStorage not available'); },
        configurable: true,
      });
      expect(() => setupService()).not.toThrow();
      expect(service.preference()).toBe('system');
    });
  });

  describe('localStorage persistence', () => {
    beforeEach(() => {
      setupService();
    });

    it('should persist dark preference', () => {
      service.setTheme('dark');
      expect(mockLocalStorage['theme-preference']).toBe('dark');
    });

    it('should persist light preference', () => {
      service.setTheme('light');
      expect(mockLocalStorage['theme-preference']).toBe('light');
    });

    it('should persist system preference', () => {
      service.setTheme('system');
      expect(mockLocalStorage['theme-preference']).toBe('system');
    });

    it('should handle localStorage write failure gracefully', () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: () => null,
          setItem: () => { throw new Error('QuotaExceededError'); },
          removeItem: () => vi.fn(),
        },
        writable: true,
        configurable: true,
      });
      expect(() => service.setTheme('dark')).not.toThrow();
      expect(service.theme()).toBe('dark');
    });
  });
});
