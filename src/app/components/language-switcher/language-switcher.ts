import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SUPPORTED_LOCALES, type LocaleConfig } from '../../config/site.config';
import { swapLocaleInPath } from '../../services/locale/locale';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private readonly document = inject(DOCUMENT);
  private readonly localeId = inject(LOCALE_ID);

  protected readonly locales = SUPPORTED_LOCALES;

  protected isActive(locale: LocaleConfig): boolean {
    return this.localeId === locale.code;
  }

  protected getTargetUrl(locale: LocaleConfig): string {
    const currentPath = this.document.defaultView?.location?.pathname ?? '/';
    return swapLocaleInPath(currentPath, locale);
  }

  protected switchTo(locale: LocaleConfig): void {
    const window = this.document.defaultView;
    if (!window) {
      return;
    }

    try {
      window.localStorage.setItem('k9n-preferred-locale', locale.code);
    } catch {
      // localStorage may be unavailable in private browsing — gracefully degrade
    }

    const targetPath = swapLocaleInPath(window.location.pathname, locale);
    window.location.pathname = targetPath;
  }
}
