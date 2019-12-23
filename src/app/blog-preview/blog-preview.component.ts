import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'dk-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
})
export class BlogPreviewComponent implements OnInit {
  @Input() max: number;
  blogPostData$: Observable<ScullyRoute[]>;

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {
    this.blogPostData$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/blog/`),
        );
      }),
    );
  }
}
