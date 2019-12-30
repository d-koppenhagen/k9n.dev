import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogContentComponent } from './blog-content/blog-content.component';
import { BlogOverviewComponent } from './blog-overview/blog-overview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BlogContentComponent, BlogOverviewComponent],
  imports: [CommonModule, BlogRoutingModule, ComponentsModule, SharedModule],
})
export class BlogModule {}
