import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'dk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  youtubePlayerWidth: number;

  constructor() {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.youtubePlayerWidth = window.innerWidth - 64;
      console.log(this.youtubePlayerWidth);
    } else {
      this.youtubePlayerWidth = undefined;
    }
  }
}
