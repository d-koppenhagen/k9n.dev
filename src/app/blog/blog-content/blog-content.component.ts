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

  constructor(
    private route: ActivatedRoute,
    private srs: ScullyRoutesService,
    private highlightService: HighlightService,
    private metaService: MetaService,
  ) {}

  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnInit() {
    this.post$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter(
          (route: ScullyRoute) =>
            route.route.startsWith(`/blog/`) &&
            route.route.includes(this.route.snapshot.params.slug),
        );
      }),
      map(currentPostData => {
        return currentPostData[0];
      }),
      tap(post => {
        this.metaService.createMetaDataForPost(post);
      }),
    );
  }

  shareTextContent() {
    return encodeURI(location.href);
  }
}
