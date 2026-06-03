import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LinkedPlatform, PublishedAt } from '../../models/content.model';

@Component({
  selector: 'app-published-at-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './published-at-banner.html',
  styleUrl: './published-at-banner.css',
})
export class PublishedAtBanner {
  readonly publishedAt = input<PublishedAt | undefined>();
  readonly linked = input<LinkedPlatform[] | undefined>();
}
