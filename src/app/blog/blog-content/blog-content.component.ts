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
      tap((post?: ScullyRoute) => {
        if (!post) {
          return;
        }
        this.metaService.createMetaDataForPost(post);
        this.shareData.url = `${location.href}${post.route}`;
        this.shareData.description = `${post.title} | ${post.author}\n`;
      }),
    );
  }

  ngAfterViewInit() {
    this.onResize();
  }

  editOnGithubLink() {
    return `https://github.com/d-koppenhagen/d-koppenhagen.de/edit/master${location.pathname}.md`;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log(this.shareBtnBox.nativeElement.clientWidth);
    if (this.shareBtnBox.nativeElement.clientWidth < 410) {
      this.shareBtnCnt = 3;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 480) {
      this.shareBtnCnt = 4;
    } else {
      this.shareBtnCnt = 5;
    }
  }
}
