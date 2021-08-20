import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { A11yModule } from '@angular/cdk/a11y';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicationsComponent } from './publications/publications.component';
import { ImprintComponent } from './imprint/imprint.component';
import { TwitterTimelineComponent } from './twitter-timeline/twitter-timeline.component';
import { TranslocoRootModule } from './transloco-root.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { TextSlotComponent } from './text-slot/text-slot.component';
import { TextSlotMachineComponent } from './text-slot-machine/text-slot-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    NavbarComponent,
    PublicationsComponent,
    ImprintComponent,
    TwitterTimelineComponent,
    CookieBannerComponent,
    TextSlotComponent,
    TextSlotMachineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    A11yModule,
    NgxTwitterTimelineModule,
    SharedModule,
    TranslocoRootModule,
    ScullyLibModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    YouTubePlayerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
