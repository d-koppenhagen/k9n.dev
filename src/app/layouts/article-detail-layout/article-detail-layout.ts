import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Rich article layout with optional hero image and sidebar.
 * Uses content projection with named slots:
 * - [slot="hero"] — Optional full-width hero image
 * - [slot="header"] — Centered header (date, title, author, tags)
 * - [slot="content"] — Main content column (markdown, banners)
 * - [slot="sidebar"] — Sidebar column (TOC, series navigation)
 *
 * Used by: BlogDetailPage
 */
@Component({
  selector: 'app-article-detail-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './article-detail-layout.html',
  styleUrl: './article-detail-layout.css',
  host: {
    '[class.article-detail-layout--with-sidebar]': 'showSidebar()',
  },
})
export class ArticleDetailLayout {
  readonly showSidebar = input(true);
}
