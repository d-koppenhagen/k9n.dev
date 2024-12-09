import { injectContentFiles } from '@analogjs/content';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostAttributes } from '../../types';

@Component({
  selector: 'dk-series-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.scss',
})
export class SeriesListComponent {
  @Input({ required: true }) series!: string;

  readonly allPosts = injectContentFiles<PostAttributes>();

  get relatedPosts() {
    return this.allPosts.filter(
      (p) => p.attributes.series && p.attributes.series === this.series,
    );
  }
}
