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
  selector: 'dk-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogContentComponent implements OnInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
  location: null;
  shareData: { url: string; description: string } = {
    url: '',
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private srs: ScullyRoutesService,
    private highlightService: HighlightService,
    private metaService: MetaService,
    private ngNavigatorShareService: NgNavigatorShareService,
  ) {}

  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnInit() {
    this.post$ = this.srs.available$.pipe(
      map((routeList) => {
        return routeList.filter(
          (route: ScullyRoute) =>
            route.route.startsWith(`/blog/`) &&
            route.route.includes(this.route.snapshot.params.slug),
        );
      }),
      map((currentPostData: ScullyRoute[]) => {
        return currentPostData[0];
      }),
      tap((post: ScullyRoute) => {
        this.metaService.createMetaDataForPost(post);
        const url = `${location.href}${post.route}`;
        const description = `${post.title} | ${post.author}\n`;
        this.shareData = { url, description };
      }),
    );
  }

  editOnGithubLink() {
    return `https://github.com/d-koppenhagen/d-koppenhagen.de/edit/master${location.pathname}.md`;
  }
}
