import { Component } from '@angular/core';
import { isScullyRunning } from '@scullyio/ng-lib';

@Component({
  selector: 'dk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  scullyRunning: boolean = isScullyRunning();
}
