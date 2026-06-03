import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Hardcoded dummy headings for visual verification during prototype phase */
const DUMMY_HEADINGS: Heading[] = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'installation', text: 'Installation', level: 3 },
  { id: 'configuration', text: 'Configuration', level: 3 },
  { id: 'core-concepts', text: 'Core Concepts', level: 2 },
  { id: 'components', text: 'Components', level: 3 },
  { id: 'services', text: 'Services', level: 3 },
  { id: 'advanced-usage', text: 'Advanced Usage', level: 2 },
  { id: 'performance-tips', text: 'Performance Tips', level: 3 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
];

@Component({
  selector: 'app-table-of-contents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-of-contents.html',
  styleUrl: './table-of-contents.css',
})
export class TableOfContents {
  readonly headings = input<Heading[]>(DUMMY_HEADINGS);
}
