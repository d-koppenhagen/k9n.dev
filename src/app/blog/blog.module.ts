import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogOverviewComponent } from '../blog-overview/blog-overview.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [BlogComponent, BlogOverviewComponent],
  imports: [SharedModule, BlogRoutingModule, ComponentsModule],
})
export class BlogModule {}
