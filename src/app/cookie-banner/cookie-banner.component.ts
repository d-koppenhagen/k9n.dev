import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dk-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
})
export class CookieBannerComponent {
  @Output() accepted: EventEmitter<boolean> = new EventEmitter();

  acceptCookies() {
    this.accepted.emit(true);
  }
}
