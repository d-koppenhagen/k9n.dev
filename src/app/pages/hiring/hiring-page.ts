import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaManager } from '../../services/meta/meta';
import { SITE_CONFIG } from '../../config/site.config';

@Component({
  selector: 'app-hiring-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hiring-page.html',
  styleUrl: './hiring-page.css',
})
export class HiringPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: $localize`:page title|Hiring page title@@page.hiring.meta.title:Für Recruiter`,
      description: $localize`:meta description|Hiring page meta description@@page.hiring.meta.description:Informationen für Recruiter und Talent Scouts zu meinen Anforderungen an neue Positionen.`,
      url: `${SITE_CONFIG.baseUrl}/hiring`,
      type: 'website',
      draft: true, // to prevent adding it to the sitemap
    });
  }
}
