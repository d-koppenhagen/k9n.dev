import { Component } from '@angular/core';
import { PreviewComponent } from '../components/preview/preview.component';
import { PublicationsComponent } from '../components/publications/publications.component';
import { AboutComponent } from '../components/about/about.component';
import { TwitterTimelineComponent } from '../components/twitter-timeline/twitter-timeline.component';
import { MeetupsComponent } from '../components/meetups/meetups.component';
import { injectContentFiles } from '@analogjs/content';
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
        <dk-preview content="blog" [posts]="blogPosts" [max]="4"></dk-preview>
      </div>
    </section>
    <dk-publications></dk-publications>
    <section class="wrapper alt style3">
      <div class="inner">
        <h2 class="major">Meine Projekte</h2>
        <dk-preview
          content="projects"
          [posts]="projectPosts"
          [max]="4"
        ></dk-preview>
      </div>
    </section>
    <dk-about></dk-about>
    <dk-meetups></dk-meetups>
    <dk-twitter-timeline></dk-twitter-timeline>
  `,
})
export default class HomePage {
  readonly blogPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/blog/');
  });
  readonly projectPosts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/projects/');
  });
}
