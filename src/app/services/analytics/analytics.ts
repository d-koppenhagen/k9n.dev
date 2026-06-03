import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

const GTM_ID = 'G-HY3CPEEH1Z';
const CONSENT_KEY = 'cookieConsent';

export type ConsentStatus = 'accepted' | 'declined' | null;

@Injectable({ providedIn: 'root' })
export class Analytics {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private initialized = false;

  getConsent(): ConsentStatus {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === 'accepted' || value === 'declined') {
      return value;
    }
    return null;
  }

  setConsent(accepted: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const status: ConsentStatus = accepted ? 'accepted' : 'declined';
    localStorage.setItem(CONSENT_KEY, status);

    if (accepted) {
      this.injectGtag();
    }
  }

  /**
   * Initialize analytics on app startup if consent was already given.
   */
  initIfConsented(): void {
    if (this.getConsent() === 'accepted') {
      this.injectGtag();
    }
  }

  private injectGtag(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.initialized = true;

    const head = this.document.head;

    // Load gtag.js script
    const gtagScript = this.document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
    head.appendChild(gtagScript);

    // Initialize dataLayer and gtag config
    const inlineScript = this.document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GTM_ID}');
    `;
    head.appendChild(inlineScript);
  }
}
