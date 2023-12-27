import { ContentFile } from '@analogjs/content';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PostAttributes } from '../../types';

@Component({
  selector: 'dk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
})
export class CardComponent {
  @Input({ required: true }) post!: ContentFile<PostAttributes>;
  constructor(private router: Router) {}

  handleClick(post: ContentFile<PostAttributes>) {
    if (post.attributes.publishedAt?.linkExternal) {
      window.open(post.attributes.publishedAt.url, '_blank');
    } else {
      // Extracting the last part between slashes and excluding the file extension
      const matchResult = post.filename.match(/\/([^/]+)\/([^/.]+)\.md$/);

      // Checking if the match was successful
      if (matchResult && matchResult.length === 3) {
        // Extracted values are in matchResult[1] and matchResult[2]
        const [, blogPart, pathBehind] = matchResult;

        // Creating the array
        const resultArray = [blogPart, pathBehind];

        this.router.navigate(resultArray);
      } else {
        console.log('URL path does not match the expected format');
      }
    }
  }
}
