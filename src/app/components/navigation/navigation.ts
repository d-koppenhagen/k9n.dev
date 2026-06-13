import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

interface NavLink {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LanguageSwitcher, ThemeSwitcher],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks: readonly NavLink[] = [
    { path: '/', label: $localize`:navigation link|Home page@@nav.home:Startseite`, exact: true },
    { path: '/blog', label: $localize`:navigation link|Blog page@@nav.blog:Blog`, exact: false },
    { path: '/talks', label: $localize`:navigation link|Talks page@@nav.talks:Vorträge`, exact: false },
    { path: '/projects', label: $localize`:navigation link|Projects page@@nav.projects:Projekte`, exact: false },
    { path: '/book', label: $localize`:navigation link|Book page@@nav.book:Buch`, exact: false },
    { path: '/contact', label: $localize`:navigation link|Contact page@@nav.contact:Kontakt`, exact: false },
  ];

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
