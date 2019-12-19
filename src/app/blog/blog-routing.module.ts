import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogOverviewComponent } from '../blog-overview/blog-overview.component';

const routes: Routes = [
  {
    path: '',
    component: BlogOverviewComponent,
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
