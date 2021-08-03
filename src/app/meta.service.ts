import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ScullyRoute } from '@scullyio/ng-lib';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    @Inject(DOCUMENT) private dom,
    public meta: Meta,
    private title: Title,
  ) {}

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

  createMetaDataForPost(post: ScullyRoute) {
    this.removeAllKnownTags();
    this.setTitle(post.title);
    this.setDescription(post.description);
    this.createCanonicalURL(post.publishedAt?.url);
    this.createTwitterCardForBlogPost(post);
    this.createOpenGraphProfileForBlogPost(post);
  }

  private setTitle(title: string) {
    this.title.setTitle(`k9n.dev | ${title}`);
  }

  private setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  private createTwitterCardForBlogPost(post: ScullyRoute) {
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });
    this.meta.updateTag({
      name: 'twitter:site',
      content: '@d_koppenhagen',
    });
    this.meta.updateTag({
      name: 'twitter:creator',
      content: '@d_koppenhagen',
    });
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
      content: `https://k9n.dev/${post.thumbnail.header}`,
    });
  }

  private createOpenGraphProfileForBlogPost(post: ScullyRoute) {
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({
      property: 'og:description',
      content: post.description,
    });
    this.meta.updateTag({
      name: 'og:image',
      content: `https://k9n.dev/${post.thumbnail.header}`,
    });
    this.meta.updateTag({
      name: 'og:url',
      content: `https://k9n.dev${post.route}`,
    });
  }

  private removeAllKnownTags() {
    this.meta.removeTag(`property='og:title'`);
    this.meta.removeTag(`name='twitter:title'`);
    this.meta.removeTag(`name='description'`);
    this.meta.removeTag(`property='og:description'`);
    this.meta.removeTag(`name='twitter:description'`);
    this.meta.removeTag(`property='og:image'`);
    this.meta.removeTag(`property='og:image:width'`);
    this.meta.removeTag(`property='og:image:height'`);
    this.meta.removeTag(`name='twitter:image'`);
    this.meta.removeTag(`name='twitter:card'`);
    this.meta.removeTag(`name='twitter:site'`);
    this.meta.removeTag(`property='og:url'`);
    this.meta.removeTag(`property='og:locale'`);
    this.meta.removeTag(`property='og:type'`);
    this.meta.removeTag(`property='fb:app_id'`);
  }
}
