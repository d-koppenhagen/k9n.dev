import { Component, output } from '@angular/core';

@Component({
  selector: 'dk-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  standalone: true,
})
export class CookieBannerComponent {
  readonly accepted = output();

  acceptCookies() {
    this.accepted.emit(true);
  }
}
