import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBluesky,
  faGithub,
  faLinkedin,
  faMastodon,
  faXing,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'dk-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [RouterLink, FontAwesomeModule],
})
export class ContactComponent {
  faLib = inject(FaIconLibrary);

  constructor() {
    this.faLib.addIcons(
      faEnvelope,
      faMastodon,
      faGithub,
      faLinkedin,
      faXing,
      faMastodon,
      faBluesky,
    );
  }
}
