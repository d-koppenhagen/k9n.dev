import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ProjectStatus = 'active' | 'maintained' | 'archived' | 'draft';

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
  host: {
    'role': 'status',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class StatusBadge {
  readonly status = input.required<ProjectStatus>();

  protected readonly icon = computed(() => {
    switch (this.status()) {
      case 'active': return '\u25cf';
      case 'maintained': return '\u25d0';
      case 'archived': return '\u25cb';
      default: return '\u25cf';
    }
  });

  protected readonly ariaLabel = computed(() =>
    $localize`:aria label|Status badge label@@statusBadge.ariaLabel:Status: ` + this.status(),
  );
}
