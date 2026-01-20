import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter, skip } from 'rxjs';

import { ContactComponent } from './components/contact/contact.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollService } from './scroll.service';

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
    <main #mainRef>
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
  readonly mainRef = viewChild.required<ElementRef<HTMLElement>>('mainRef');

  cookiesAccepted = false;
  isBrowser = false;

  constructor() {
    this.setupScrollBehaviourForAnker();
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cookiesAccepted = this.isBrowser
      ? Boolean(localStorage.getItem('cookiesAccepted'))
      : true;

    // for a11y: focus <main> landmark after navigation
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1), // skip when page entered first time (deeplink)
      )
      .subscribe(() => {
        const mainEl = this.mainRef().nativeElement;
        mainEl.setAttribute('tabindex', '-1');
        mainEl.focus();
      });
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
