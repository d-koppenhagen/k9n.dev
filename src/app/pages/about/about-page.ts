import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MetaManager } from '../../services/meta/meta';
import { AUTHOR } from '../../../data/author';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  imports: [NgOptimizedImage],
})
export class AboutPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: 'About',
      description: AUTHOR.description.de,
      url: `${AUTHOR.url}/about`,
      type: 'website',
    });
  }
}
