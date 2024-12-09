import {
  ContentFile,
  injectContent,
  MarkdownComponent,
} from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { MetaService } from '../../meta.service';
import { PostAttributes } from '../../types';

@Component({
  imports: [MarkdownComponent, AsyncPipe, DatePipe, RouterLink],
  template: `
    <article class="wrapper alt">
      <div class="inner">
        @if (post$ | async; as post) {
          <h1>{{ post.attributes.title }}</h1>
          <section class="project-header">
            @if (
              post.attributes.thumbnail && post.attributes.thumbnail.header
            ) {
              <img [src]="post.attributes.thumbnail.header" alt="" />
            }
          </section>

          <section class="project-content">
            <analog-markdown
              [lang]="post.attributes.language || 'de'"
              [content]="post.content"
              classes="markdown-content"
            ></analog-markdown>
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
        }
      </div>
    </article>
  `,
  styleUrl: './slug.page.style.scss',
})
export default class ProjectContentComponent {
  readonly shareBtnBox = viewChild.required<ElementRef>('shareBtnBox');
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'projects',
  }).pipe(
    tap((post) =>
      this.metaService.createMetaDataForPost(
        'projects',
        post as ContentFile<PostAttributes>,
      ),
    ),
  );

  constructor(private metaService: MetaService) {}

  editOnGithubLink(filename: string) {
    return `https://github.com/d-koppenhagen/k9n.dev/edit/main${filename}`;
  }
}
