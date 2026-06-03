import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Layout component that renders a responsive content grid.
 *
 * Layout behavior:
 * - Mobile: single column, all items stacked
 * - Tablet (≥768px): 2 columns, first item spans both
 * - Desktop (≥1024px): 8 columns — first item 5/8, second 3/8, rest 50/50
 *
 * Uses ViewEncapsulation.None since this is a pure layout component.
 * All styles are scoped via the host element selector.
 * Sets --content-grid-image-height CSS variable for card children to consume.
 */
@Component({
  selector: 'app-content-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  styles: `
    app-content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }

    app-content-grid > * {
      min-width: 0;
    }

    /* Tablet: 2 columns, first item spans full width */
    @media (min-width: 768px) {
      app-content-grid {
        grid-template-columns: repeat(2, 1fr);
        --content-grid-image-height: 180px;
      }

      app-content-grid > :first-child {
        grid-column: 1 / -1;
      }
    }

    /* Desktop: 8-column grid, first row 5/3, rest 50/50 */
    @media (min-width: 1024px) {
      app-content-grid {
        grid-template-columns: repeat(8, 1fr);
        --content-grid-image-height: 180px;
      }

      app-content-grid > :first-child {
        grid-column: 1 / 6;
      }

      app-content-grid > :nth-child(2) {
        grid-column: 6 / 9;
      }

      app-content-grid > :nth-child(n + 3) {
        grid-column: span 4;
      }
    }
  `,
})
export class ContentGrid {}
