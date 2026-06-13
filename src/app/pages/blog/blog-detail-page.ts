import { ChangeDetectionStrategy, Component, computed, effect, inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MarkdownContent } from '../../components/markdown-content/markdown-content';
import { TableOfContents } from '../../components/table-of-contents/table-of-contents';
import { SeriesNavigation } from '../../components/series-navigation/series-navigation';
import { PublishedAtBanner } from '../../components/published-at-banner/published-at-banner';
import { ArticleDetailLayout } from '../../layouts/article-detail-layout/article-detail-layout';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';
import { SITE_CONFIG, toAbsoluteUrl } from '../../config/site.config';
import { JsonLdArticle } from '../../models/json-ld.model';

@Component({
  selector: 'app-blog-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownContent, TableOfContents, SeriesNavigation, PublishedAtBanner, ArticleDetailLayout, RouterLink, DatePipe],
  templateUrl: './blog-detail-page.html',
  styleUrl: './blog-detail-page.css',
})
export class BlogDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);
  private readonly localeId = inject(LOCALE_ID);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly post = computed(() => {
    const currentSlug = this.slug();
    return this.contentService.getBlogPost(currentSlug) ?? null;
  });

  protected readonly contentLang = computed(() => {
    const p = this.post();
    return p?.language && p.language !== this.localeId ? p.language : null;
  });

  protected readonly filterByTagLabel = $localize`:aria label|Filter blog posts by tag@@page.blogDetail.keyword.ariaLabel:Beiträge filtern nach: `;

  readonly seriesPosts = computed(() => {
    const currentPost = this.post();
    if (!currentPost?.series) {
      return [];
    }
    const posts = this.contentService.getBlogPostsBySeries(currentPost.series);
    return posts.map(p => ({ slug: p.slug, title: p.title, created: p.created }));
  });

  protected readonly hasSidebar = computed(() => {
    const currentPost = this.post();
    if (!currentPost) return false;
    return (currentPost.headings?.length > 0) || (this.seriesPosts().length > 1);
  });

  constructor() {
    effect(() => {
      const currentPost = this.post();
      if (currentPost) {
        const imageUrl = currentPost.thumbnail?.header
          ? toAbsoluteUrl(currentPost.thumbnail.header)
          : undefined;

        this.metaService.updateMeta({
          title: currentPost.title,
          description: currentPost.description,
          image: imageUrl ? { url: imageUrl, width: 1200, height: 630 } : undefined,
          imageAlt: imageUrl ? currentPost.title : undefined,
          url: `${SITE_CONFIG.baseUrl}/blog/${currentPost.slug}`,
          type: 'article',
          author: currentPost.author.name,
          publishedTime: currentPost.created,
          modifiedTime: currentPost.updated,
          keywords: currentPost.keywords,
        });

        const articleSchema: JsonLdArticle = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: currentPost.title,
          description: currentPost.description,
          author: { '@type': 'Person', name: currentPost.author.name },
          datePublished: currentPost.created,
          ...(currentPost.updated ? { dateModified: currentPost.updated } : {}),
          ...(imageUrl ? { image: imageUrl } : {}),
        };
        this.metaService.injectJsonLd(articleSchema);
      }
    });
  }
}
