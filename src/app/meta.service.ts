import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(@Inject(DOCUMENT) private dom, public meta: Meta) {}

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

  createTwitterCard(post) {
    this.meta.updateTag({
      name: 'twitter:title',
      content: post.title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: post.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://d-koppenhagen.de/' + post.thumbnail,
    });
  }
}
