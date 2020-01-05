import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'dk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  availableLanguages = [];
  activeLanguage = '';
  languageSwitched = false;

  constructor(readonly translocoService: TranslocoService) {}

  ngOnInit() {
    this.availableLanguages = this.translocoService.getAvailableLangs();
    this.activeLanguage = this.translocoService.getActiveLang();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  switchLanguage() {
    this.languageSwitched
      ? this.translocoService.setActiveLang(this.availableLanguages[0])
      : this.translocoService.setActiveLang(this.availableLanguages[1]);
    this.languageSwitched = !this.languageSwitched;
    this.activeLanguage = this.translocoService.getActiveLang();
  }
}
