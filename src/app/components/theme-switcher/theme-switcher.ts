import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme } from '../../services/theme/theme';

type ThemeOption = 'light' | 'dark' | 'system';

@Component({
  selector: 'app-theme-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  private readonly themeService = inject(Theme);

  protected readonly preference = this.themeService.preference;

  protected readonly options: readonly { value: ThemeOption; label: string }[] = [
    { value: 'light', label: $localize`:theme option|Light theme@@theme.light:Hell` },
    { value: 'dark', label: $localize`:theme option|Dark theme@@theme.dark:Dunkel` },
    { value: 'system', label: $localize`:theme option|System theme@@theme.system:System` },
  ];

  protected selectTheme(value: ThemeOption): void {
    this.themeService.setTheme(value);
    // Focus is naturally retained on the clicked button element
  }
}
