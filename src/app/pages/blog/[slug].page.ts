import {
  ContentFile,
  injectContent,
  MarkdownComponent,
} from '@analogjs/content';
import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { MetaService } from '../../meta.service';

import { PostAttributes } from '../../types';
import { SharePostComponent } from '../../components/share-post/share-post.component';

@Component({
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    DatePipe,
    RouterLink,
    SharePostComponent,
  ],
  template: `
    <article class="wrapper alt">
      <div class="inner">
        @if (post$ | async; as post) {
          <section class="blog-header">
            @if (
              post.attributes.thumbnail && post.attributes.thumbnail.header
            ) {
              <img [src]="post.attributes.thumbnail.header" alt="" />
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
                    Original veröffentlicht auf:
                    <a [href]="post.attributes.publishedAt.url">{{
                      post.attributes.publishedAt.name
                    }}</a
                    >.
                  </div>
                </div>
              }
            </section>
          }
          @if (post.attributes.linked) {
            <section class="external-links">
              @if (post.attributes.linked.devTo) {
                <a [href]="post.attributes.linked.devTo">Dev.to</a>
              }
              @if (
                post.attributes.linked.devTo && post.attributes.linked.medium
              ) {
                |
              }
              @if (post.attributes.linked.medium) {
                <a [href]="post.attributes.linked.medium">Medium.com</a>
              }
            </section>
          }
          @if (post.attributes.related) {
            <section class="article-series">
              <h2 class="sub-heading">Artikelserie</h2>
              <ol class="alt">
                @for (related of post.attributes.related; track related.slug) {
                  <li
                    [routerLink]="related.slug"
                    [class.current]="post.slug === related.slug"
                  >
                    <a [routerLink]="['..', related.slug]">{{
                      related.title
                    }}</a>
                  </li>
                }
              </ol>
            </section>
          }

          <section class="blog-content">
            <analog-markdown [content]="post.content"></analog-markdown>
            <div class="edit-on-github">
              <a
                [href]="editOnGithubLink(post.filename)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Auf GitHub bearbeiten
              </a>
            </div>
          </section>
          <!-- <section class="blog-footer">
            <h2 class="sub-heading">Teilen</h2>
            @defer (when isBrowser) {
              <dk-share-post [description]="post.attributes.description" />
            }
          </section> -->
        }
      </div>
    </article>
  `,
  styleUrl: './slug.page.style.scss',
})
export default class BlogContentComponent {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog',
  }).pipe(
    tap((post) =>
      this.metaService.createMetaDataForPost(
        'blog',
        post as ContentFile<PostAttributes>,
      ),
    ),
  );
  isBrowser = false;

  constructor(
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  editOnGithubLink(filename: string) {
    return `https://github.com/d-koppenhagen/k9n.dev/edit/main/src/content/blog/${filename}.md`;
  }
}
