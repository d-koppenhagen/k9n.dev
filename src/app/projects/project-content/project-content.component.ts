import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { NgNavigatorShareService } from 'ng-navigator-share';

import { HighlightService } from '../../shared/highlight.service';
import { MetaService } from '../../meta.service';

@Component({
  selector: 'dk-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProjectContentComponent implements AfterViewChecked {
  post$: Observable<ScullyRoute> = this.srs.available$.pipe(
    map((routeList) =>
      routeList.filter(
        (route: ScullyRoute) =>
          route.route.startsWith(`/projects/`) &&
          route.route.includes(this.route.snapshot.params.slug),
      ),
    ),
    map((currentPostData: ScullyRoute[]) => currentPostData[0]),
    tap((post?: ScullyRoute) => {
      if (!post) {
        return;
      }
      this.metaService.createMetaDataForPost(post);
    }),
  );
  location: null;

  constructor(
    private route: ActivatedRoute,
    private srs: ScullyRoutesService,
    private highlightService: HighlightService,
    private metaService: MetaService,
    private ngNavigatorShareService: NgNavigatorShareService,
  ) {}

  /**
   * Highlight projects post when it's ready
   */
  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  async shareApi(title: string, description: string) {
    try {
      await this.ngNavigatorShareService.share({
        title,
        text: description,
        url: location.href,
      });
    } catch (error) {
      console.warn('You app is not shared, reason: ', error);
    }
  }

  editOnGithubLink() {
    return `https://github.com/d-koppenhagen/k9n.dev/edit/master${location.pathname}.md`;
  }
}
