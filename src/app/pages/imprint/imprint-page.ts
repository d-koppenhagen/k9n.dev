import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaManager } from '../../services/meta/meta';

@Component({
  selector: 'app-imprint-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './imprint-page.html',
  styleUrl: './imprint-page.css',
})
export class ImprintPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: 'Imprint',
      description: 'Impressum und rechtliche Informationen für k9n.dev.',
      url: 'https://k9n.dev/imprint',
      type: 'website',
    });
  }
}
