import { ContentFile } from '@analogjs/content';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { PostAttributes } from '../../types';

@Component({
  selector: 'dk-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [RouterLink, FontAwesomeModule],
})
export class CardComponent {
  readonly post = input.required<ContentFile<PostAttributes>>();
  private faLib = inject(FaIconLibrary);

  constructor() {
    this.faLib.addIcons(faChevronRight);
  }

  get routeToPost() {
    // Extracting the last part between slashes and excluding the file extension
    const matchResult = this.post()?.filename?.match(
      /\/([^/]+)\/([^/.]+)\.md$/,
    );
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
    const publishedAt = this.post()?.attributes?.publishedAt;
    return publishedAt && publishedAt.linkExternal && publishedAt.url
      ? publishedAt.url
      : undefined;
  }
}
