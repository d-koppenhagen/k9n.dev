import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';
import { ContentListLayout } from '../../layouts/content-list/content-list-layout';
import { createContentFilter } from '../../services/content-filter/content-filter';

@Component({
  selector: 'app-talks-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentCard, ContentListLayout],
  templateUrl: './talks-list-page.html',
  styleUrl: './talks-list-page.css',
})
export class TalksListPage {
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);

  readonly filter = createContentFilter(this.contentService.talks);

  protected readonly pageTitle = $localize`:page title|Talks list page title@@page.talks.title:Vorträge`;
  protected readonly pageSubtitle = $localize`:page subtitle|Talks list page subtitle@@page.talks.subtitle:Konferenzvorträge und Präsentationen zu Angular, Webentwicklung und moderner Frontend-Architektur.`;
  protected readonly gridAriaLabel = $localize`:aria label|Talks list grid@@page.talks.grid.ariaLabel:Vortragsliste`;

  constructor() {
    this.metaService.updateMeta({
      title: 'Talks',
      description: 'Conference talks and presentations on Angular, web development, and modern frontend architecture.',
      url: 'https://k9n.dev/talks',
      type: 'website',
    });
  }
}
