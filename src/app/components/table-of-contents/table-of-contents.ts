import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

@Component({
  selector: 'app-table-of-contents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-of-contents.html',
  styleUrl: './table-of-contents.css',
})
export class TableOfContents {
  readonly headings = input<Heading[]>([]);
}
