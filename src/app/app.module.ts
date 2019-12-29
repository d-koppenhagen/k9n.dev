import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { A11yModule } from '@angular/cdk/a11y';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicationsComponent } from './publications/publications.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HighlightService } from './highlight.service';
import { TwitterTimelineComponent } from './twitter-timeline/twitter-timeline.component';
import { SharedModule } from './shared.module';

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
    ImpressumComponent,
    TwitterTimelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    A11yModule,
    NgxTwitterTimelineModule,
    SharedModule,
  ],
  providers: [ScullyRoutesService, HighlightService],
  bootstrap: [AppComponent],
})
export class AppModule {}
