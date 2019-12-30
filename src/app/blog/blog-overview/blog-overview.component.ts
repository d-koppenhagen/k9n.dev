import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dk-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {
  keyword: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.keyword = this.route.snapshot.queryParams.keyword;
  }
}
