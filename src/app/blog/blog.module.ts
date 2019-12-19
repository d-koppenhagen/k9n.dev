import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogOverviewComponent } from '../blog-overview/blog-overview.component';

@NgModule({
  declarations: [BlogComponent, BlogOverviewComponent],
  imports: [CommonModule, BlogRoutingModule, ComponentsModule],
})
export class BlogModule {}
