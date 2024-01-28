import { ContentFile } from '@analogjs/content';
import { Component, Input, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PostAttributes, PublishedAt } from '../../types';

@Component({
  selector: 'dk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [RouterLink],
  standalone: true,
})
export class CardComponent {
  post = input.required<ContentFile<PostAttributes>>()
  publishedAt = computed(() => {
    return this.post().attributes.publishedAt || {} as PublishedAt
  })
  constructor() {}

  get routeToPost() {
    // Extracting the last part between slashes and excluding the file extension
    const matchResult = this.post().filename.match(/\/([^/]+)\/([^/.]+)\.md$/);
    let resultArray: string[] = [];

    // Checking if the match was successful
    if (matchResult && matchResult.length === 3) {
      // Extracted values are in matchResult[1] and matchResult[2]
      const [, blogPart, pathBehind] = matchResult;

      // Creating the array
      resultArray = ['/', blogPart, pathBehind];
    }
    return resultArray;
  }

  get externalUrl() {
    const publishedAt = this.post().attributes.publishedAt;
    return publishedAt && publishedAt.linkExternal && publishedAt.url
      ? publishedAt.url
      : undefined;
  }
}
