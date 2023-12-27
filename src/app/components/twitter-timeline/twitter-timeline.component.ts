import { Component } from '@angular/core';
import { AngularTwitterTimelineModule } from 'angular-twitter-timeline';

@Component({
  selector: 'dk-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.scss'],
  imports: [AngularTwitterTimelineModule],
  standalone: true,
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
