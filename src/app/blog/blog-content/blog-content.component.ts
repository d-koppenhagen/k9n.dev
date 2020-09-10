import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { HighlightService } from '../../shared/highlight.service';
import { MetaService } from '../../meta.service';

@Component({
  selector: 'dk-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogContentComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
  location: null;
  shareData: { url: string; description: string } = {
    url: '',
    description: '',
  };
  shareBtnCnt = 5;
  @ViewChild('shareBtnBox') shareBtnBox: ElementRef;

  constructor(
    private router: Router,
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

  ngAfterViewInit() {
    this.onResize();
  }

  ngOnInit() {
    this.refreshPost();
    this.router.events
      .pipe(
        filter((e: any) => e instanceof NavigationEnd),
        filter((e: NavigationEnd) => e.url.startsWith('/blog')),
      )
      .subscribe(() => {
        this.refreshPost();
      });
  }

  refreshPost() {
    this.post$ = this.srs.available$.pipe(
      map((routeList) => {
        return routeList.filter((route: ScullyRoute) => {
          if (
            route.route.startsWith(`/blog/`) &&
            route.route.includes(this.route.snapshot.params.slug)
          ) {
            const seriesName = route.series;
            if (route.series) {
              route.related = routeList
                .filter((r: ScullyRoute) => r.series === seriesName)
                .map((r: ScullyRoute) => ({
                  title: r.title,
                  route: r.route,
                  created: r.created,
                }))
                .sort(
                  (
                    a: { title: string; route: string; created: string },
                    b: { title: string; route: string; created: string },
                  ) => {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return (
                      new Date(b.created).getTime() -
                      new Date(a.created).getTime()
                    );
                  },
                )
                .reverse();
            }
            return route;
          }
        });
      }),
      map((currentPostData: ScullyRoute[]) => {
        return currentPostData[0];
      }),
      tap((post?: ScullyRoute) => {
        if (!post) {
          return;
        }
        this.metaService.createMetaDataForPost(post);
        this.shareData.url = `${location.href}${post.route}`;
        this.shareData.description = `${post.title} | ${post.author.name}\n`;
      }),
    );
  }

  editOnGithubLink() {
    return `https://github.com/d-koppenhagen/d-koppenhagen.de/edit/master${location.pathname}.md`;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.shareBtnBox?.nativeElement?.clientWidth) {
      return;
    }
    if (this.shareBtnBox.nativeElement.clientWidth < 410) {
      this.shareBtnCnt = 3;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 480) {
      this.shareBtnCnt = 4;
    } else {
      this.shareBtnCnt = 5;
    }
  }
}
