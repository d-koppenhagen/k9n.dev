import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Reusable surface container that extracts the shared "box" look (radius,
 * surface background, border, hover/focus affordances) behind a single
 * content-projection slot. The projected content owns its own layout; the
 * Card stays `display: block` and never imposes flex/grid or ARIA semantics.
 *
 * Interaction model — two orthogonal hover behaviours:
 * - `interactive`: the card wraps a focusable/clickable element (e.g. an
 *   `<a>`). On link hover/focus the card swaps its border to
 *   `--color-interactive`, lifts the background to `--color-surface-elevated`
 *   and gains `--shadow-card-hover`. Use for genuinely clickable boxes.
 * - `hoverElevate`: a passive affordance — the card gains only
 *   `--shadow-card-hover` on hover, with no border/background change. Use for
 *   non-clickable boxes that should feel slightly raised on hover (timeline).
 *
 * Surface tuning — three orthogonal inputs that layer on top of the two hover
 * behaviours above:
 * - `radius`: border radius of the box. `'md'` (default) keeps the historical
 *   look (`--radius-md`); `'lg'` uses `--radius-lg` for larger content cards.
 * - `lift`: elevation/motion affordance. At rest the card carries
 *   `--shadow-card`; on hover it gains `--shadow-card-hover` and
 *   `translateY(-2px)`. Independent of `interactive`/`hoverElevate`.
 * - `focusRing`: accessibility affordance. When any descendant is
 *   `:focus-visible`, the whole box shows a `--color-focus-ring` outline. Use
 *   when the focusable element lives inside the projected content and the box
 *   itself should reflect its focus. Independent of `interactive`/`hoverElevate`.
 */
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
  styleUrl: './card.css',
  host: {
    '[class.card--elevated]': "variant() === 'elevated'",
    '[class.card--card]': "variant() === 'card'",
    '[class.card--interactive]': 'interactive()',
    '[class.card--hover-elevate]': 'hoverElevate()',
    '[class.card--pad-none]': "padding() === 'none'",
    '[class.card--pad-sm]': "padding() === 'sm'",
    '[class.card--pad-md]': "padding() === 'md'",
    '[class.card--pad-lg]': "padding() === 'lg'",
    '[class.card--radius-md]': "radius() === 'md'",
    '[class.card--radius-lg]': "radius() === 'lg'",
    '[class.card--lift]': 'lift()',
    '[class.card--focus-ring]': 'focusRing()',
  },
})
export class Card {
  readonly variant = input<'elevated' | 'card'>('card');
  readonly interactive = input<boolean>(false);
  readonly hoverElevate = input<boolean>(false);
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('lg');
  readonly radius = input<'md' | 'lg'>('md');
  readonly lift = input<boolean>(false);
  readonly focusRing = input<boolean>(false);
}
