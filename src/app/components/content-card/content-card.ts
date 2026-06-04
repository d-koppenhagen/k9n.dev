import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  LOCALE_ID,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { DatePipe, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Tabs, TabList, Tab, TabPanel } from '@angular/aria/tabs';
import { SmartLink } from '../../directives/smart-link/smart-link';

export interface CardThumbnail {
  header: string;
  card?: string;
}

export interface CardPublishedAt {
  name: string;
  url: string;
  logo?: string;
}

export interface SeriesItem {
  title: string;
  routeLink: string;
  externalUrl?: string;
  hreflang?: string;
  language?: string;
  thumbnail?: CardThumbnail;
  date: string;
  description: string;
  publishedAt?: CardPublishedAt;
}

@Component({
  selector: 'app-content-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, SmartLink, Tabs, TabList, Tab, TabPanel, DatePipe],
  templateUrl: './content-card.html',
  styleUrl: './content-card.css',
})
export class ContentCard {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly date = input.required<string>();
  readonly routeLink = input.required<string>();
  readonly thumbnail = input<CardThumbnail>();
  readonly externalUrl = input<string>();
  readonly hreflang = input<string>();
  readonly language = input<string>();
  readonly eventName = input<string>();
  readonly publishedAt = input<CardPublishedAt>();
  readonly headingLevel = input<2 | 3>(3);
  readonly seriesName = input<string>('');
  readonly seriesItems = input<SeriesItem[]>([]);

  protected readonly maxVisible = 3;
  protected readonly currentTab = linkedSignal(() => this.initialTab());
  private readonly tabTrack = viewChild<ElementRef<HTMLElement>>('tabTrack');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly localeId = inject(LOCALE_ID);

  protected readonly contentLang = computed(() => {
    const lang = this.language();
    return lang && lang !== this.localeId ? lang : null;
  });

  private isInitialTab = true;

  constructor() {
    // Scroll the active tab into view within the tab track container
    effect(() => {
      const tab = this.currentTab();
      if (!this.isBrowser) return;
      const trackEl = this.tabTrack()?.nativeElement;
      if (!trackEl) return;
      const idx = parseInt(tab, 10);
      if (isNaN(idx)) return;
      const tabEl = trackEl.querySelector(`[role="tab"]:nth-child(${idx + 1})`) as HTMLElement;
      if (!tabEl) return;

      if (this.isInitialTab) {
        // On initial render: position the tab track without scrolling the page
        this.isInitialTab = false;
        const scrollLeft = tabEl.offsetLeft - trackEl.offsetLeft - (trackEl.clientWidth - tabEl.clientWidth) / 2;
        trackEl.scrollLeft = Math.max(0, scrollLeft);
      } else {
        // On user-initiated tab changes: smooth scroll within the container
        tabEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      }
    });
  }

  protected readonly slideOffset = computed(() => {
    const tab = this.currentTab();
    const idx = parseInt(tab, 10);
    return isNaN(idx) ? 0 : idx * 100;
  });

  protected readonly initialTab = computed(() => {
    const items = this.seriesItems();
    const idx = items.findIndex((item) => item.routeLink === this.routeLink());
    return '' + (idx >= 0 ? idx : 0);
  });

  private readonly FALLBACK_THUMBNAIL = 'images/bg1.jpg';

  protected readonly thumbnailSrc = computed(() => {
    const thumb = this.thumbnail();
    return thumb?.card ?? thumb?.header ?? this.FALLBACK_THUMBNAIL;
  });

  protected getThumb(item: SeriesItem): string {
    return item.thumbnail?.card ?? item.thumbnail?.header ?? this.FALLBACK_THUMBNAIL;
  }

  protected getItemLang(item: SeriesItem): string | null {
    return item.language && item.language !== this.localeId ? item.language : null;
  }

  protected stepPrev(): void {
    const items = this.seriesItems();
    const idx = parseInt(this.currentTab(), 10);
    const prev = (idx - 1 + items.length) % items.length;
    this.currentTab.set('' + prev);
  }

  protected stepNext(): void {
    const items = this.seriesItems();
    const idx = parseInt(this.currentTab(), 10);
    const next = (idx + 1) % items.length;
    this.currentTab.set('' + next);
  }
}
