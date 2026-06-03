import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ContentCard, SeriesItem } from '../../components/content-card/content-card';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';
import { ContentListLayout } from '../../layouts/content-list/content-list-layout';
import { createContentFilter } from '../../services/content-filter/content-filter';
import { BlogPost } from '../../models/content.model';
import { JsonLdCollectionPage } from '../../models/json-ld.model';

@Component({
  selector: 'app-blog-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentCard, ContentListLayout],
  templateUrl: './blog-list-page.html',
  styleUrl: './blog-list-page.css',
})
export class BlogListPage {
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);

  readonly filter = createContentFilter(this.contentService.blogPosts);

  protected readonly pageTitle = $localize`:page title|Blog list page title@@page.blog.title:Blog`;
  protected readonly pageSubtitle = $localize`:page subtitle|Blog list page subtitle@@page.blog.subtitle:Gedanken zu Angular, Webentwicklung und modernem Frontend.`;
  protected readonly gridAriaLabel = $localize`:aria label|Blog posts grid@@page.blog.grid.ariaLabel:Blogbeiträge`;

  constructor() {
    this.metaService.updateMeta({
      title: 'Blog',
      description: 'Thoughts on Angular, web development, and building for the modern web.',
      url: 'https://k9n.dev/blog',
      type: 'website',
    });

    const collectionPageSchema: JsonLdCollectionPage = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blog',
      description: 'Thoughts on Angular, accessibility, web development, and building for the modern web.',
      url: 'https://k9n.dev/blog',
    };
    this.metaService.injectJsonLd(collectionPageSchema);
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
