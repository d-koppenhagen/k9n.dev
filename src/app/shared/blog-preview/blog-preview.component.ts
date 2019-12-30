import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dk-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
})
export class BlogPreviewComponent implements OnInit {
  @Input() max: number;
  @Input() keyword: string;
  blogPostData$: Observable<ScullyRoute[]>;

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {
    this.blogPostData$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/blog/`),
        );
      }),
      map(routeList => {
        if (this.max) {
          routeList = routeList.slice(0, this.max);
        }
        return routeList.reverse();
      }),
      map(routeList => {
        if (!this.keyword) {
          return routeList;
        }
        return routeList.filter((route: ScullyRoute) =>
          route.keywords.includes(this.keyword),
        );
      }),
    );
  }
}
