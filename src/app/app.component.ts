import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContactComponent } from './components/contact/contact.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'dk-root',
  standalone: true,
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
  cookiesAccepted = false;
  isBrowser = false;

  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
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
      if (e instanceof NavigationEnd && !/#.*/.test(e.url)) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
