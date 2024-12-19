import { ScrollService } from './scroll.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContactComponent } from './components/contact/contact.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'dk-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    ContactComponent,
    CookieBannerComponent,
    FontAwesomeModule,
  ],
  template: `
    <dk-navbar></dk-navbar>
    <dk-header></dk-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <dk-contact></dk-contact>
    @if (!cookiesAccepted) {
      <dk-cookie-banner (accepted)="toggleCookiesAccepted()"></dk-cookie-banner>
    }
  `,
})
export class AppComponent {
  readonly router = inject(Router);
  readonly scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

  cookiesAccepted = false;
  isBrowser = false;

  constructor() {
    this.setupScrollBehaviourForAnker();
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cookiesAccepted = this.isBrowser
      ? Boolean(localStorage.getItem('cookiesAccepted'))
      : true;
  }

  toggleCookiesAccepted() {
    this.cookiesAccepted = true;
    if (this.isBrowser) {
      localStorage.setItem('cookiesAccepted', 'true');
    }
  }

  private setupScrollBehaviourForAnker() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (/#.*/.test(e.url)) {
          const fragment = e.url.split('#')[1];
          this.scrollService.scrollToElement(fragment);
        } else {
          this.scrollService.scrollToTop();
        }
      }
    });
  }
}
