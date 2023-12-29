import { injectContentFiles } from '@analogjs/content';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { AboutComponent } from '../components/about/about.component';
import { MeetupsComponent } from '../components/meetups/meetups.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { PublicationsComponent } from '../components/publications/publications.component';
import { TwitterTimelineComponent } from '../components/twitter-timeline/twitter-timeline.component';
import { PostAttributes } from '../types';

@Component({
  standalone: true,
  imports: [
    PreviewComponent,
    PublicationsComponent,
    AboutComponent,
    TwitterTimelineComponent,
    MeetupsComponent,
  ],
  styles: `
    .style1 {
      margin: 0;
    }
  `,
  template: `
    <section class="wrapper alt style1">
      <div class="inner">
        <h2 class="major">Aktuelle Blog Posts</h2>
        <dk-preview content="blog" [posts]="blogPosts" [max]="4" />
      </div>
    </section>
    <dk-publications />
    <section class="wrapper alt style3">
      <div class="inner">
        <h2 class="major">Meine Projekte</h2>
        <dk-preview content="projects" [posts]="projectPosts" [max]="4" />
      </div>
    </section>
    <dk-about />
    <dk-meetups />
    @if (isBrowser) {
      @defer (on viewport; prefetch on idle) {
        <dk-twitter-timeline />
      } @placeholder {
        <div>Posts werden geladen...</div>
      }
    }
  `,
})
export default class HomePage {
  isBrowser = false;

  readonly blogPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/blog/');
  });

  readonly projectPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/projects/');
  });

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
