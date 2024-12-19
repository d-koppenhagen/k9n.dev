import { injectContentFiles } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';

import { PreviewComponent } from '../../components/preview/preview.component';
import { PostAttributes } from '../../types';

@Component({
  imports: [RouterOutlet, RouterLink, AsyncPipe, PreviewComponent],
  styles: `
    .wrapper {
      margin-top: 0;
    }
    .active-keyword-filter {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
      flex-wrap: wrap;
    }
  `,
  template: `
    <section class="wrapper alt">
      <div class="inner">
        <h2 class="major">Meine Blog Posts</h2>
        <input
          #searchInput
          type="search"
          placeholder="Suche"
          name="demo-name"
          aria-required="false"
          aria-label="Suche"
        />

        @if (keyword$ | async; as keyword) {
          <div class="active-keyword-filter">
            <h3>Filter:</h3>
            <button
              class="button xs"
              [title]="'Filter ' + keyword + ' entfernen'"
              (click)="removeKeywordFilter()"
            >
              {{ keyword }}
              <i class="fa fa-close"></i>
            </button>
          </div>
        }
        <dk-preview
          content="blog"
          [posts]="posts"
          [keyword]="keyword$ | async"
          [search]="searchString"
        ></dk-preview>
      </div>
    </section>
  `,
})
export default class BlogPage implements AfterViewChecked {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly posts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/blog/');
  });

  readonly searchInput = viewChild<ElementRef>('searchInput');
  keyword$ = this.route?.queryParams.pipe(map((p) => p['keyword']));
  searchString = '';

  ngAfterViewChecked() {
    const sInput = this.searchInput();
    if (sInput) {
      fromEvent(sInput.nativeElement, 'keyup')
        .pipe(filter(Boolean), debounceTime(300), distinctUntilChanged())
        .subscribe(() => {
          this.searchString = sInput.nativeElement.value;
        });
    }
  }

  removeKeywordFilter() {
    this.router.navigate([], {
      queryParams: {
        keyword: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
