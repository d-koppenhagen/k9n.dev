import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SeriesPost {
  slug: string;
  title: string;
  created: string;
}

@Component({
  selector: 'app-series-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './series-navigation.html',
  styleUrl: './series-navigation.css',
})
export class SeriesNavigation {
  readonly currentSlug = input.required<string>();
  readonly seriesPosts = input<SeriesPost[]>([]);

  protected readonly sortedPosts = computed(() => {
    const posts = this.seriesPosts();
    return [...posts].sort(
      (a, b) => a.created.localeCompare(b.created),
    );
  });
}
