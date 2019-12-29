// SharedModule is imported into `layout-modules` and any feature module lazy loaded into `layout-modules`
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import {  RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BlogPreviewComponent],
  exports: [
    CommonModule,
    BlogPreviewComponent,
  ]
})
export class SharedModule {}
