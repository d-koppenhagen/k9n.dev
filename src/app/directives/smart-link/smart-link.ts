import { computed, Directive, inject, input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * A reusable directive that turns an anchor element into either:
 * - An internal router link (via Router.navigate)
 * - An external link (opens in a new tab with proper accessibility)
 *
 * Usage:
 * ```html
 * <a [appSmartLink]="'/blog/my-post'" [externalUrl]="post.publishedAt?.url" [hreflang]="post.language" [ariaLabel]="post.title">
 *   ...
 * </a>
 * ```
 *
 * When `externalUrl` is set, the link opens externally in a new tab.
 * The aria-label is automatically suffixed with "(opens in a new tab)" for screen readers.
 * When `externalUrl` is not set, the link navigates via Angular Router.
 */
@Directive({
  selector: 'a[appSmartLink]',
  host: {
    '[attr.href]': 'effectiveHref()',
    '[attr.target]': 'effectiveTarget()',
    '[attr.rel]': 'effectiveRel()',
    '[attr.hreflang]': 'effectiveHreflang()',
    '[attr.aria-label]': 'effectiveAriaLabel()',
    '(click)': 'onClick($event)',
  },
})
export class SmartLink {
  /** The internal route path (used when no externalUrl is provided). */
  readonly appSmartLink = input.required<string>();

  /** If set, the link opens this URL externally in a new tab. */
  readonly externalUrl = input<string | undefined>();

  /** Optional hreflang attribute for external links. */
  readonly hreflang = input<string | undefined>();

  /** The aria-label for the link — suffixed with "(opens in a new tab)" for external links. */
  readonly ariaLabel = input<string | undefined>();

  private readonly router = inject(Router);

  protected readonly effectiveHref = computed(() =>
    this.externalUrl() ?? this.appSmartLink(),
  );

  protected readonly effectiveTarget = computed(() =>
    this.externalUrl() ? '_blank' : null,
  );

  protected readonly effectiveRel = computed(() =>
    this.externalUrl() ? 'noopener noreferrer' : null,
  );

  protected readonly effectiveHreflang = computed(() =>
    this.externalUrl() ? (this.hreflang() ?? null) : null,
  );

  protected readonly effectiveAriaLabel = computed(() => {
    const label = this.ariaLabel();
    if (!label) return null;
    return this.externalUrl()
      ? label + ' (opens in a new tab)'
      : label;
  });

  protected onClick(event: Event): void {
    if (!this.externalUrl()) {
      event.preventDefault();
      this.router.navigateByUrl(this.appSmartLink());
    }
  }
}
