import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectContentComponent } from './project-content/project-content.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [ProjectContentComponent, ProjectOverviewComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ScullyLibModule,
    SharedModule,
    TranslocoRootModule,
  ],
})
export class ProjectsModule {}
