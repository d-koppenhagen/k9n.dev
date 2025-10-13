import {
  ContentFile,
  injectContent,
  MarkdownComponent,
} from '@analogjs/content';
import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { SeriesListComponent } from '../../components/series-list/series-list.component';
import { StickyNavigationComponent } from '../../components/sticky-navigation/sticky-navigation.component';
import { MetaService } from '../../meta.service';
import { PostAttributes } from '../../types';

@Component({
  imports: [
    MarkdownComponent,
    AsyncPipe,
    DatePipe,
    RouterLink,
    SeriesListComponent,
    StickyNavigationComponent,
  ],
  template: `
    @if (post$ | async; as post) {
      <article class="wrapper alt" [lang]="post.attributes.language">
        <dk-sticky-navigation [content]="post.content" />
        <div class="inner">
          <h1>{{ post.attributes.title }}</h1>
          <section class="blog-header">
            @if (
              post.attributes.thumbnail && post.attributes.thumbnail.header
            ) {
              <img
                class="adaptive-glass"
                [src]="post.attributes.thumbnail.header"
                alt=""
              />
            }
          </section>
          @if (post.attributes.keywords) {
            <section class="extra-section">
              <div class="extra-info">
                @if (post.attributes.updated) {
                  <span>
                    <time datetime="2001-05-15 19:00">{{
                      post.attributes.updated | date
                    }}</time>
                  </span>
                }
                <h2 class="sub-heading">Stichwörter</h2>
              </div>
              <div class="actions">
                @for (keyword of post.attributes.keywords; track keyword) {
                  <span>
                    <button
                      routerLink="/blog"
                      [queryParams]="{ keyword: keyword }"
                      class="button xs"
                      [attr.aria-label]="'Stichwort: ' + keyword"
                    >
                      {{ keyword }}
                    </button>
                  </span>
                }
              </div>
              @if (
                post.attributes.publishedAt &&
                post.attributes.publishedAt.name &&
                post.attributes.publishedAt.url
              ) {
                <div class="published-at">
                  <div>
                    <a
                      [href]="post.attributes.publishedAt.url"
                      class="published-at-link"
                      [attr.aria-label]="
                        'Original veröffentlicht auf ' +
                        post.attributes.publishedAt.name
                      "
                      [lang]="post.attributes.language || 'de'"
                    >
                      @if (post.attributes.publishedAt.logo) {
                        <img
                          class="published-at-logo"
                          [src]="post.attributes.publishedAt.logo"
                          alt=""
                        />
                      }
                    </a>
                  </div>
                  <div>
                    Original veröffentlicht auf
                    <a
                      [href]="post.attributes.publishedAt.url"
                      [lang]="post.attributes.language || 'de'"
                      >{{ post.attributes.publishedAt.name }}</a
                    >.
                  </div>
                </div>
              }
            </section>
          }
          @if (post.attributes.linked) {
            <section class="external-links">
              @if (post.attributes.linked.devTo) {
                <a
                  [href]="post.attributes.linked.devTo"
                  [lang]="post.attributes.language || 'de'"
                  >Dev.to</a
                >
              }
              @if (
                post.attributes.linked.devTo && post.attributes.linked.medium
              ) {
                |
              }
              @if (post.attributes.linked.medium) {
                <a
                  [href]="post.attributes.linked.medium"
                  [lang]="post.attributes.language || 'de'"
                  >Medium.com</a
                >
              }
            </section>
          }
          @if (post.attributes.series) {
            <dk-series-list [series]="post.attributes.series"></dk-series-list>
          }

          <section class="blog-content">
            <analog-markdown
              [lang]="post.attributes.language || 'de'"
              [content]="post.content"
              classes="markdown-content"
            ></analog-markdown>
            @if (
              !post.content &&
              post.attributes.publishedAt &&
              post.attributes.publishedAt.name &&
              post.attributes.publishedAt.url
            ) {
              <div>
                {{ post.attributes.description }}
              </div>
              <a
                class="external-article"
                [href]="post.attributes.publishedAt.url"
                [lang]="post.attributes.language || 'de'"
                >&rarr;
                @if (post.attributes.language === 'en') {
                  Read On:
                } @else {
                  Weiterlesen auf
                }
                {{ post.attributes.publishedAt.name }}</a
              >
            } @else {
              <div class="edit-on-github">
                <a
                  [href]="editOnGithubLink(post.filename)"
                  rel="noopener noreferrer"
                >
                  Auf GitHub bearbeiten
                </a>
              </div>
            }
          </section>
        </div>
      </article>
    }
  `,
  styleUrl: './slug.page.style.scss',
})
export default class BlogContentComponent {
  private metaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);

  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog',
  }).pipe(
    tap((post) => {
      return this.metaService.createMetaDataForPost(
        'blog',
        post as ContentFile<PostAttributes>,
      );
    }),
  );
  isBrowser = isPlatformBrowser(this.platformId);

  editOnGithubLink(filename: string) {
    return `https://github.com/d-koppenhagen/k9n.dev/edit/main${filename}.md`;
  }
}
