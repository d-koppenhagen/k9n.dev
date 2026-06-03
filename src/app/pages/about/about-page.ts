import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaManager } from '../../services/meta/meta';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: 'About',
      description: 'Über Danny Koppenhagen – Frontend Architekt bei DB Systel, Fokus auf Accessibility und Open Source. Co-Autor des Angular-Buchs.',
      url: 'https://k9n.dev/about',
      type: 'website',
    });
  }
}
