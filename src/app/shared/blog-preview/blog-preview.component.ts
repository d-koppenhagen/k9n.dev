import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dk-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
})
export class BlogPreviewComponent implements OnInit, OnChanges {
  @Input() max: number;
  @Input() keyword: string;
  @Input() search: string;
  blogPostData$: Observable<ScullyRoute[]>;

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {
    this.loadPosts();
  }

  ngOnChanges() {
    this.loadPosts();
  }

  private loadPosts() {
    this.blogPostData$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList
          .filter((route: ScullyRoute) => route.route.startsWith(`/blog/`))
          .filter((route: ScullyRoute) => route.publish !== false)
          .reverse();
      }),
      map(routeList => {
        if (!this.keyword) {
          return routeList;
        }
        return routeList.filter((route: ScullyRoute) =>
          route.keywords.includes(this.keyword),
        );
      }),
      map(routeList => {
        if (!this.search) {
          return routeList;
        }
        return routeList.filter((route: ScullyRoute) => {
          const searchTerm = this.search.toLowerCase();
          return (
            route.keywords.includes(this.search) ||
            route.title.toLowerCase().includes(searchTerm) ||
            route.description.toLowerCase().includes(searchTerm) ||
            route.author.toLowerCase().includes(searchTerm)
          );
        });
      }),
      map(routeList => {
        if (this.max) {
          routeList = routeList.slice(0, this.max);
        }
        return routeList;
      }),
    );
  }
}
