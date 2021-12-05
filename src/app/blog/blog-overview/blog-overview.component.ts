import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  fromEvent,
  pluck,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';

@Component({
  selector: 'dk-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  keyword$: Observable<string>;
  searchString: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.keyword$ = this.route.queryParams.pipe(pluck('keyword'));
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.searchString = this.searchInput.nativeElement.value;
      });
  }

  removeKeywordFilter() {
    this.router.navigate([], {
      queryParams: {
        keyword: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
