import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MetaManager } from '../../services/meta/meta';
import { ContentCard, SeriesItem } from '../../components/content-card/content-card';
import { Content } from '../../services/content/content';
import { NavLink } from '../../components/nav-link/nav-link';
import { ContentGrid } from '../../layouts/content-grid/content-grid';
import { PersonalTimeline } from '../../components/personal-timeline/personal-timeline';
import { BlogPost } from '../../models/content.model';
import { AUTHOR } from '../../../data/author';
import { JsonLdPerson } from '../../models/json-ld.model';
import { SITE_CONFIG } from '../../config/site.config';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentCard, NavLink, ContentGrid, PersonalTimeline, NgOptimizedImage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);

  readonly recentBlogPosts = this.contentService.getRecentBlogPosts(4);
  readonly recentTalks = this.contentService.getRecentTalks(4);
  readonly recentProjects = this.contentService.getRecentProjects(4);

  constructor() {
    this.metaService.updateMeta({
      title: `${AUTHOR.name} - Developer, Speaker, Author`,
      description: AUTHOR.tagline.en,
      url: AUTHOR.url,
      type: 'website',
      image: { url: AUTHOR.image.url, width: AUTHOR.image.width, height: AUTHOR.image.height },
      imageAlt: AUTHOR.image.alt,
    });

    const personSchema: JsonLdPerson = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: AUTHOR.name,
      url: SITE_CONFIG.baseUrl,
      jobTitle: AUTHOR.jobTitle.en,
      sameAs: [
        AUTHOR.social.github.url,
        AUTHOR.social.linkedin.url,
      ],
    };
    this.metaService.injectJsonLd(personSchema);
  }

  private readonly seriesCache = new Map<string, SeriesItem[]>();

  protected getSeriesItems(post: BlogPost): SeriesItem[] {
    if (!post.series) return [];
    if (this.seriesCache.has(post.series)) {
      return this.seriesCache.get(post.series)!;
    }
    const items = this.contentService.getBlogPostsBySeries(post.series).map((p) => ({
      title: p.title,
      routeLink: '/blog/' + p.slug,
      externalUrl: p.publishedAt?.url,
      hreflang: p.language,
      language: p.language,
      thumbnail: p.thumbnail,
      date: p.created,
      description: p.description,
      publishedAt: p.publishedAt,
    }));
    this.seriesCache.set(post.series, items);
    return items;
  }
}
