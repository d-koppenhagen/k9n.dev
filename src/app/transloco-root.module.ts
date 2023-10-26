import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  TranslocoModule,
  provideTransloco,
} from '@ngneat/transloco';
import { Injectable, NgModule, isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['de', 'en'],
        defaultLang: navigator.language.substring(0, 2) || 'de',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        fallbackLang: 'de',
        missingHandler: {  useFallbackTranslation: true },
      },
      loader: TranslocoHttpLoader
    }),
  ],
})
export class TranslocoRootModule {}
