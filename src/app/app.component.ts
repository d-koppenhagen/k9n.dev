import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private doc,
    @Inject('GTAG_CODE') private gtagCode: string,
  ) {
    this.setupScrollBehaviourForAnker();
    this.setupGtag();
  }

  private setupScrollBehaviourForAnker() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!/\#.*/.test(event.url)) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

  private setupGtag() {
    const navEndEvent$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag('config', this.gtagCode, { page_path: e.urlAfterRedirects });
    });

    const script = this.doc.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.gtagCode;
    this.doc.head.prepend(script);
  }
}
