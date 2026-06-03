import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';
import { ContentListLayout } from '../../layouts/content-list/content-list-layout';
import { createContentFilter } from '../../services/content-filter/content-filter';

@Component({
  selector: 'app-projects-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentCard, ContentListLayout],
  templateUrl: './projects-list-page.html',
  styleUrl: './projects-list-page.css',
})
export class ProjectsListPage {
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);

  readonly filter = createContentFilter(this.contentService.projects);

  protected readonly pageTitle = $localize`:page title|Projects list page title@@page.projects.title:Projekte`;
  protected readonly pageSubtitle = $localize`:page subtitle|Projects list page subtitle@@page.projects.subtitle:Open-Source-Tools, Bibliotheken und Nebenprojekte, die ich gebaut oder zu denen ich beigetragen habe.`;
  protected readonly gridAriaLabel = $localize`:aria label|Projects list grid@@page.projects.grid.ariaLabel:Projektliste`;

  constructor() {
    this.metaService.updateMeta({
      title: 'Projects',
      description: 'Open source tools, libraries, and side projects I\'ve built or contributed to.',
      url: 'https://k9n.dev/projects',
      type: 'website',
    });
  }
}
