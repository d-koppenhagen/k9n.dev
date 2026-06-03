import { Service, signal, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

type ThemePreference = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

const STORAGE_KEY = 'theme-preference';
const VALID_PREFERENCES: ThemePreference[] = ['dark', 'light', 'system'];

@Service()
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly resolvedTheme = signal<ResolvedTheme>('light');
  private readonly userPreference = signal<ThemePreference>('system');

  readonly theme = this.resolvedTheme.asReadonly();
  readonly preference = this.userPreference.asReadonly();

  private mediaQuery: MediaQueryList | null = null;
  private readonly mediaQueryListener = (_event: MediaQueryListEvent) => {
    if (this.userPreference() === 'system') {
      this.applyResolvedTheme();
    }
  };

  constructor() {
    this.initialize();
  }

  setTheme(preference: ThemePreference): void {
    this.userPreference.set(preference);
    this.persistPreference(preference);
    this.applyResolvedTheme();
  }

  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const persisted = this.loadPersistedPreference();
    if (persisted) {
      this.userPreference.set(persisted);
    }

    this.applyResolvedTheme();
    this.listenToSystemChanges();
  }

  private applyResolvedTheme(): void {
    const resolved = this.resolveTheme();
    this.resolvedTheme.set(resolved);

    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.setAttribute('data-theme', resolved);
    }
  }

  private resolveTheme(): ResolvedTheme {
    const preference = this.userPreference();

    if (preference === 'dark' || preference === 'light') {
      return preference;
    }

    // preference === 'system': detect from OS
    return this.getSystemPreference();
  }

  private getSystemPreference(): ResolvedTheme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      return mq.matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private persistPreference(preference: ThemePreference): void {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // localStorage unavailable (SSR, privacy mode) — fail silently
    }
  }

  private loadPersistedPreference(): ThemePreference | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value && VALID_PREFERENCES.includes(value as ThemePreference)) {
        return value as ThemePreference;
      }
      // Invalid value — discard it
      if (value !== null) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      }
      return null;
    } catch {
      // localStorage unavailable — fall back to system preference
      return null;
    }
  }

  private listenToSystemChanges(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    } catch {
      // Media query not supported — default to light mode (already set)
    }
  }
}
