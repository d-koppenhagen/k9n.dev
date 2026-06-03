import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaManager } from '../../services/meta/meta';
import { SmartLink } from '../../directives/smart-link/smart-link';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmartLink],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  private readonly metaService = inject(MetaManager);

  constructor() {
    this.metaService.updateMeta({
      title: 'Contact',
      description: 'Get in touch with Danny Koppenhagen via email or social media.',
      url: 'https://k9n.dev/contact',
      type: 'website',
    });
  }
}
