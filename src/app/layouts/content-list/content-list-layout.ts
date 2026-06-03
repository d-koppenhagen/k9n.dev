import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentFilter } from '../../components/content-filter/content-filter';
import { ContentGrid } from '../content-grid/content-grid';

/**
 * Shared layout for searchable/filterable content list pages.
 * Provides the page shell (header, filter, grid) and projects
 * the actual card content via ng-content.
 */
@Component({
  selector: 'app-content-list-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentFilter, ContentGrid],
  templateUrl: './content-list-layout.html',
  styleUrl: './content-list-layout.css',
})
export class ContentListLayout {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly allTags = input<string[]>([]);
  readonly gridAriaLabel = input<string>($localize`:aria label|Default content list grid@@contentListLayout.grid.ariaLabel:Inhaltsliste`);
}
