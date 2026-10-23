import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../card/card';

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

@Component({
  selector: 'app-table-of-contents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Card],
  templateUrl: './table-of-contents.html',
  styleUrl: './table-of-contents.css',
})
export class TableOfContents {
  readonly headings = input<Heading[]>([]);
}
