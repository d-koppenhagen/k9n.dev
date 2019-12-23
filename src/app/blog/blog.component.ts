import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var ng: any;
@Component({
  selector: 'dk-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  thumbnail$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private srs: ScullyRoutesService,
  ) {}

  ngOnInit() {
    this.thumbnail$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter(
          (route: ScullyRoute) =>
            route.route.startsWith(`/blog/`) &&
            route.route.includes(this.route.snapshot.params.slug),
        );
      }),
      map(currentPostData => {
        return currentPostData[0].thumbnail;
      }),
    );
  }
}
