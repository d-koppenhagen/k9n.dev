import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SeriesPost {
  slug: string;
  title: string;
  created: string;
}

/** Hardcoded dummy series data for visual verification during prototype phase. */
export const DUMMY_SERIES_POSTS: SeriesPost[] = [
  { slug: '2024-01-angular-signals-intro', title: 'Angular Signals: An Introduction', created: '2024-01-15' },
  { slug: '2024-02-angular-signals-computed', title: 'Computed Signals and Derived State', created: '2024-02-10' },
  { slug: '2024-03-angular-signals-effects', title: 'Effects and Side Effects with Signals', created: '2024-03-05' },
  { slug: '2024-04-angular-signals-migration', title: 'Migrating from RxJS to Signals', created: '2024-04-20' },
];

@Component({
  selector: 'app-series-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './series-navigation.html',
  styleUrl: './series-navigation.css',
})
export class SeriesNavigation {
  readonly currentSlug = input.required<string>();
  readonly seriesPosts = input<SeriesPost[]>(DUMMY_SERIES_POSTS);

  protected readonly sortedPosts = computed(() => {
    const posts = this.seriesPosts();
    return [...posts].sort(
      (a, b) => a.created.localeCompare(b.created),
    );
  });
}
