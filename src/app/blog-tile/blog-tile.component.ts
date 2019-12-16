import { Component, OnInit, Input } from '@angular/core';
import { BlogEntry } from '../shared/types';

@Component({
  selector: 'dk-blog-tile',
  templateUrl: './blog-tile.component.html',
  styleUrls: ['./blog-tile.component.scss'],
})
export class BlogTileComponent implements OnInit {
  @Input() article: BlogEntry;

  constructor() {}

  ngOnInit() {}
}
