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
          <section class="project-header">
            @if (
              post.attributes.thumbnail && post.attributes.thumbnail.header
            ) {
              <img [src]="post.attributes.thumbnail.header" alt="" />
            }
          </section>

          <section class="project-content">
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
        }
      </div>
    </article>
  `,
  styleUrl: './slug.page.style.scss',
})
export default class ProjectContentComponent implements AfterViewInit {
  @ViewChild('shareBtnBox') shareBtnBox!: ElementRef;
  location!: null;
  shareData: { url: string; description: string } = {
    url: '',
    description: '',
  };
  shareBtnCnt = 5;
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
