import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HighlightService } from '../highlight.service';

declare var ng: any;
@Component({
  selector: 'dk-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit, AfterViewChecked {
  post$: Observable<any>;
  location: null;

  constructor(
    private route: ActivatedRoute,
    private srs: ScullyRoutesService,
    private highlightService: HighlightService,
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
    );
  }

  shareTextContent() {
    return encodeURI(location.href);
  }
}
