import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  viewChild,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Navigation } from './components/navigation/navigation';
import { Footer } from './components/footer/footer';
import { CookieBanner } from './components/cookie-banner/cookie-banner';
import { MetaManager } from './services/meta/meta';
import { Analytics } from './services/analytics/analytics';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Navigation, Footer, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly metaService = inject(MetaManager);
  private readonly analytics = inject(Analytics);

  protected readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');
  protected readonly routeAnnouncement = signal('');
  protected readonly showCookieBanner = signal(false);

  private routerSubscription: Subscription | null = null;
  private previousPath = '';

  constructor() {
    this.metaService.injectWebsiteJsonLd();

    if (isPlatformBrowser(this.platformId)) {
      const consent = this.analytics.getConsent();
      this.showCookieBanner.set(consent === null);
      this.analytics.initIfConsented();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.previousPath = this.router.url.split('?')[0];

    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const newPath = event.urlAfterRedirects.split('?')[0];
        // Skip focus/announcement when only query params changed (e.g. filters)
        if (newPath !== this.previousPath) {
          this.previousPath = newPath;
          this.handleRouteChange();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  protected skipToContent(event: Event): void {
    event.preventDefault();
    const mainEl = this.mainContent()?.nativeElement;
    if (mainEl) {
      mainEl.focus();
    }
  }

  private handleRouteChange(): void {
    const mainEl = this.mainContent()?.nativeElement;
    if (mainEl) {
      mainEl.focus({ preventScroll: true });
    }

    const pageTitle = this.titleService.getTitle() || $localize`:route announcement|Default page loaded announcement@@app.route.pageLoaded:Seite geladen`;
    this.routeAnnouncement.set(pageTitle);
  }

  protected handleCookieConsent(accepted: boolean): void {
    this.analytics.setConsent(accepted);
    this.showCookieBanner.set(false);
  }
}
