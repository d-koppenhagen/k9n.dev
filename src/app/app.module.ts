import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { A11yModule } from '@angular/cdk/a11y';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { PublicationsComponent } from './publications/publications.component';
import { BlogOverviewComponent } from './blog-overview/blog-overview.component';
import { ImpressumComponent } from './impressum/impressum.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    NavbarComponent,
    BlogPreviewComponent,
    PublicationsComponent,
    BlogOverviewComponent,
    ImpressumComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, A11yModule],
  providers: [ScullyRoutesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
