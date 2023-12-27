import { ContentFile } from '@analogjs/content';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PostAttributes } from './types';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  isBrowser = false;

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    public meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  createCanonicalURL(url?: string) {
    if (this.isBrowser) {
      const canURL = url === undefined ? this.dom.URL : url;
      let link: HTMLLinkElement | null = document.querySelector(
        'link[rel="canonical"]',
      );
      if (link) {
        link.setAttribute('href', canURL);
      } else {
        link = this.dom.createElement('link');
        link!.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link!.setAttribute('href', canURL);
      }
    }
  }

  createMetaDataForPost(
    dir: 'blog' | 'projects',
    post: ContentFile<PostAttributes>,
  ) {
    this.removeAllKnownTags();
    this.setTitle(post.attributes.title);
    this.setDescription(post.attributes.description);
    this.createCanonicalURL(post.attributes.publishedAt?.url);
    this.createTwitterCardForBlogPost(post);
    this.createOpenGraphProfileForBlogPost(dir, post);
  }

  private setTitle(title: string) {
    this.title.setTitle(`k9n.dev | ${title}`);
  }

  private setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  private createTwitterCardForBlogPost(post: ContentFile<PostAttributes>) {
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
      content: post.attributes.title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: post.attributes.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `https://k9n.dev/${post.attributes.thumbnail.header}`,
    });
  }

  private createOpenGraphProfileForBlogPost(
    dir: 'blog' | 'projects',
    post: ContentFile<PostAttributes>,
  ) {
    this.meta.updateTag({
      property: 'og:title',
      content: post.attributes.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: post.attributes.description,
    });
    this.meta.updateTag({
      name: 'og:image',
      content: `https://k9n.dev/${post.attributes.thumbnail.header}`,
    });
    this.meta.updateTag({
      name: 'og:url',
      content: `https://k9n.dev/${dir}/${post.slug}`,
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
