import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dk-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.scss'],
})
export class TwitterTimelineComponent implements OnInit {
  readonly twitterTimelineData = {
    sourceType: 'profile',
    url: 'd_koppenhagen',
  };
  readonly twitterTimelineOpts = {
    tweetLimit: 3,
    theme: 'dark',
    chrome: ['noheader', 'nofooter', 'noborders', 'transparent', 'noscrollbar'],
  };

  constructor() {}

  ngOnInit() {}
}
