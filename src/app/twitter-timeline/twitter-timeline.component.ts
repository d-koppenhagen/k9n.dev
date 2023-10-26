import { Component } from '@angular/core';

@Component({
  selector: 'dk-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.scss'],
})
export class TwitterTimelineComponent {
  readonly twitterTimelineData = {
    sourceType: 'profile',
    url: 'd_koppenhagen',
  };
  readonly twitterTimelineOpts = {
    tweetLimit: 10,
    theme: 'dark',
    chrome: ['noheader', 'nofooter', 'noborders', 'transparent', 'noscrollbar'],
  };
}
