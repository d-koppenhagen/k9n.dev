import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  LOCALE_ID,
} from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { SmartLink } from '../../directives/smart-link/smart-link';
import { StatusBadge, ProjectStatus } from '../status-badge/status-badge';
import { SeriesPaginationCarousel } from '../series-pagination-carousel/series-pagination-carousel';

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
  imports: [NgOptimizedImage, SmartLink, StatusBadge, SeriesPaginationCarousel, DatePipe],
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
  readonly priority = input(false);
  readonly status = input<ProjectStatus>();
  readonly seriesName = input<string>('');
  readonly seriesItems = input<SeriesItem[]>([]);

  protected readonly currentSlide = linkedSignal(() => this.initialSlide());
  private readonly localeId = inject(LOCALE_ID);

  protected readonly contentLang = computed(() => {
    const lang = this.language();
    return lang && lang !== this.localeId ? lang : null;
  });

  protected readonly initialSlide = computed(() => {
    const items = this.seriesItems();
    const idx = items.findIndex((item) => item.routeLink === this.routeLink());
    return idx >= 0 ? idx : 0;
  });

  protected readonly isUpcoming = computed(() => {
    const dateStr = this.date();
    if (!dateStr) return false;
    const eventDate = new Date(dateStr + 'T23:59:59');
    return eventDate > new Date();
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
}
