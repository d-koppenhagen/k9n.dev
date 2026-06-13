import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * A pagination carousel for series content.
 *
 * Projects child elements as slides (each direct child = one slide).
 * Provides numbered tab indicators and optional prev/next arrows.
 *
 * Usage:
 * ```html
 * <app-series-pagination-carousel [itemCount]="items.length" [(selectedIndex)]="currentSlide">
 *   <div class="carousel__panel">Slide 1</div>
 *   <div class="carousel__panel">Slide 2</div>
 * </app-series-pagination-carousel>
 * ```
 */
@Component({
  selector: 'app-series-pagination-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-pagination-carousel.html',
  styleUrl: './series-pagination-carousel.css',
})
export class SeriesPaginationCarousel {
  /** Total number of slides in the carousel. */
  readonly itemCount = input.required<number>();

  /** The currently selected slide index (two-way bindable). Controls both highlighting and visible slide. */
  readonly selectedIndex = model<number>(0);

  /** Maximum number of visible tab indicators before arrows appear. */
  readonly maxVisibleTabs = input(3);

  /** Label displayed before the pagination tabs. */
  readonly label = input<string>(
    $localize`:card label|Series label@@contentCard.series.label:Serie`,
  );

  private readonly tabTrack = viewChild<ElementRef<HTMLElement>>('tabTrack');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private hasScrolledInitially = false;

  protected readonly showArrows = computed(() => this.itemCount() > this.maxVisibleTabs());

  protected readonly slideTransform = computed(() => {
    const idx = this.selectedIndex();
    return `translateX(-${idx * 100}%)`;
  });

  protected readonly items = computed(() =>
    Array.from({ length: this.itemCount() }, (_, i) => i),
  );

  constructor() {
    // Initial scroll: position tab track after first render
    afterNextRender(() => {
      this.scrollToTab(this.selectedIndex(), false);
      this.hasScrolledInitially = true;
    });

    // Subsequent changes: smooth scroll to active tab
    effect(() => {
      const idx = this.selectedIndex();
      if (!this.isBrowser || !this.hasScrolledInitially) return;
      this.scrollToTab(idx, true);
    });
  }

  private scrollToTab(idx: number, smooth: boolean): void {
    const trackEl = this.tabTrack()?.nativeElement;
    if (!trackEl) return;
    const tabEl = trackEl.querySelector(`[role="tab"]:nth-child(${idx + 1})`) as HTMLElement;
    if (!tabEl) return;

    if (smooth) {
      tabEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    } else {
      const scrollLeft = tabEl.offsetLeft - (trackEl.clientWidth - tabEl.clientWidth) / 2;
      trackEl.scrollLeft = Math.max(0, scrollLeft);
    }
  }

  protected selectTab(index: number): void {
    this.selectedIndex.set(index);
  }

  protected stepPrev(): void {
    const count = this.itemCount();
    const idx = this.selectedIndex();
    const prev = (idx - 1 + count) % count;
    this.selectedIndex.set(prev);
  }

  protected stepNext(): void {
    const count = this.itemCount();
    const idx = this.selectedIndex();
    const next = (idx + 1) % count;
    this.selectedIndex.set(next);
  }
}
