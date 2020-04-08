import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectContentComponent } from './project-content/project-content.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectOverviewComponent,
  },
  {
    path: ':slug',
    component: ProjectContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
