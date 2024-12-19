import { injectContentFiles } from '@analogjs/content';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';

import { AboutComponent } from '../components/about/about.component';
import { MeetupsComponent } from '../components/meetups/meetups.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { PublicationsComponent } from '../components/publications/publications.component';
import { PostAttributes } from '../types';

@Component({
  imports: [
    PreviewComponent,
    PublicationsComponent,
    AboutComponent,
    MeetupsComponent,
  ],
  styles: `
    .m0 {
      margin: 0;
    }
  `,
  template: `
    <section class="wrapper alt style1 m0">
      <div class="inner">
        <h2 class="major">Aktuelle Blog Posts</h2>
        <dk-preview content="blog" [posts]="blogPosts" [max]="4" />
      </div>
    </section>
    <section class="wrapper style3">
      <div class="inner">
        <h2 class="major">Meine Talks & Slides</h2>
        <dk-preview content="talks" [posts]="talkPosts" [max]="4" />
      </div>
    </section>
    <dk-publications />
    <section class="wrapper alt style1">
      <div class="inner">
        <h2 class="major">Meine Projekte</h2>
        <dk-preview content="projects" [posts]="projectPosts" [max]="4" />
      </div>
    </section>
    <dk-about />
    <dk-meetups />
  `,
})
export default class HomePage {
  private platformId = inject(PLATFORM_ID);

  isBrowser = false;

  readonly blogPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/blog/');
  });

  readonly projectPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/projects/');
  });

  readonly talkPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/talks/');
  });

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
