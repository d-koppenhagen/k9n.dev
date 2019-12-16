import { Component, OnInit } from '@angular/core';
import { BlogEntry } from '../shared/types';

@Component({
  selector: 'dk-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {
  articles: BlogEntry[] = [
    {
      slug: 'Sed feugiat lorem',
      html:
        'Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.',
      html_url: 'foobar',
      meta: {
        title: 'Sed feugiat lorem',
        hidden: false,
        author: 'Danny Koppenhagen',
        mail: 'mail@d-koppenhagen.de',
        published: '2019-11-22',
        changed: '2019-11-23',
        keywords: ['angular'],
        language: 'german',
        thumbnail: 'assets/images/pic04.jpg',
      },
    },
    {
      slug: 'Sed feugiat lorem',
      html:
        'Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.',
      html_url: 'foobar',
      meta: {
        title: 'Sed feugiat lorem',
        hidden: false,
        author: 'Danny Koppenhagen',
        mail: 'mail@d-koppenhagen.de',
        published: '2019-11-22',
        changed: '2019-11-23',
        keywords: ['angular'],
        language: 'german',
        thumbnail: 'assets/images/pic03.jpg',
      },
    },
    {
      slug: 'Sed feugiat lorem',
      html:
        'Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.',
      html_url: 'foobar',
      meta: {
        title: 'Sed feugiat lorem',
        hidden: false,
        author: 'Danny Koppenhagen',
        mail: 'mail@d-koppenhagen.de',
        published: '2019-11-22',
        changed: '2019-11-23',
        keywords: ['angular'],
        language: 'german',
        thumbnail: 'assets/images/pic05.jpg',
      },
    },
  ];

  constructor() {}

  ngOnInit() {}
}
