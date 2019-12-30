import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import {
  pluck,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'dk-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit, AfterViewInit {
  keyword$: Observable<string>;
  searchString: string;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.keyword$ = this.route.queryParams.pipe(pluck('keyword'));
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(300), distinctUntilChanged())
      .subscribe((text: string) => {
        this.searchString = this.input.nativeElement.value;
      });
  }
}
