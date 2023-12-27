import {
  ContentFile,
  injectContent,
  MarkdownComponent,
} from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { tap } from 'rxjs';
import { MetaService } from '../../meta.service';

import { PostAttributes } from '../../types';

@Component({
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    DatePipe,
    RouterLink,
    ShareButtonsModule,
    ShareIconsModule,
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
                [href]="editOnGithubLink()"
                target="_blank"
                rel="noopener noreferrer"
              >
                Auf Github bearbeiten
              </a>
            </div>
          </section>
          <section class="blog-footer">
            <h2 class="sub-heading">Teilen</h2>
            <div #shareBtnBox>
              <share-buttons
                [theme]="'circles-dark'"
                [include]="[
                  'copy',
                  'twitter',
                  'email',
                  'whatsapp',
                  'facebook',
                  'telegram',
                  'messenger',
                  'linkedin',
                  'xing',
                  'sms',
                  'print'
                ]"
                [show]="shareBtnCnt"
                [url]="shareData.url"
                [description]="shareData.description"
                [autoSetMeta]="false"
              ></share-buttons>
            </div>
          </section>
        }
      </div>
    </article>
  `,
  styleUrl: './slug.page.style.scss',
})
export default class BlogContentComponent implements AfterViewInit {
  @ViewChild('shareBtnBox') shareBtnBox!: ElementRef;
  location!: null;
  shareData: { url: string; description: string } = {
    url: '',
    description: '',
  };
  shareBtnCnt = 5;
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

  constructor(private metaService: MetaService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.shareBtnBox?.nativeElement?.clientWidth) {
      return;
    }
    if (this.shareBtnBox.nativeElement.clientWidth < 320) {
      this.shareBtnCnt = 2;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 410) {
      this.shareBtnCnt = 3;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 480) {
      this.shareBtnCnt = 4;
    } else {
      this.shareBtnCnt = 5;
    }
  }

  ngAfterViewInit() {
    this.onResize();
  }

  editOnGithubLink() {
    return `https://github.com/d-koppenhagen/k9n.dev/edit/master${location.pathname}.md`;
  }
}
