import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Simple, narrow layout for detail pages without hero image or sidebar.
 * Uses content projection with named slots:
 * - [slot="header"] — Meta information, title, description
 * - [slot="content"] — Main content (markdown, links, banners)
 *
 * Used by: TalkDetailPage, ProjectDetailPage
 */
@Component({
  selector: 'app-content-detail-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-detail-layout.html',
  styleUrl: './content-detail-layout.css',
})
export class ContentDetailLayout {}
