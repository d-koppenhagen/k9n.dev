import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dk-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  standalone: true,
})
export class CookieBannerComponent {
  @Output() accepted: EventEmitter<boolean> = new EventEmitter();

  acceptCookies() {
    this.accepted.emit(true);
  }
}
