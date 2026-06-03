import {
  Component,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner {
  readonly consentGiven = output<boolean>();

  protected accept(): void {
    this.consentGiven.emit(true);
  }

  protected decline(): void {
    this.consentGiven.emit(false);
  }
}
