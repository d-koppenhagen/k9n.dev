import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(@Inject(DOCUMENT) private dom) {}

  createCanonicalURL(url?: string) {
    const canURL = url === undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', canURL);
    } else {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canURL);
    }
  }
}
