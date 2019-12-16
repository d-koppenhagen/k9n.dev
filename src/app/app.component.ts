import {IdleMonitorService} from '@scullyio/ng-lib'; 
 import { Component } from '@angular/core';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
 constructor (private idle: IdleMonitorService) { } 

  title = 'd-koppenhagen-website';
}
