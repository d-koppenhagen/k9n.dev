import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  cookiesAccepted = false;

  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private doc,
  ) {
    this.setupScrollBehaviourForAnker();
    this.cookiesAccepted = Boolean(localStorage.getItem('cookiesAccepted'));
  }

  toggleCookiesAccepted() {
    this.cookiesAccepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
  }

  private setupScrollBehaviourForAnker() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!/\#.*/.test(event.url)) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
}
