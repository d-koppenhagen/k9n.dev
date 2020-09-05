import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
export class ProjectContentComponent implements OnInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
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

  ngOnInit() {
    this.post$ = this.srs.available$.pipe(
      map((routeList) => {
        return routeList.filter(
          (route: ScullyRoute) =>
            route.route.startsWith(`/projects/`) &&
            route.route.includes(this.route.snapshot.params.slug),
        );
      }),
      map((currentPostData: ScullyRoute[]) => {
        return currentPostData[0];
      }),
      tap((post?: ScullyRoute) => {
        if (!post) {
          return;
        }
        this.metaService.createMetaDataForPost(post);
      }),
    );
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
    return `https://github.com/d-koppenhagen/d-koppenhagen.de/edit/master${location.pathname}.md`;
  }
}
