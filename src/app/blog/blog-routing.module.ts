import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogPreviewComponent } from '../blog-preview/blog-preview.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPreviewComponent,
  },
  {
    path: ':slug',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
