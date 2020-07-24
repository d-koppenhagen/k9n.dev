import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'dk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  youtubePlayerWidth: number;
  @ViewChild('videoBox') videoBox: ElementRef;

  constructor() {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log();
    this.youtubePlayerWidth = this.videoBox.nativeElement.clientWidth;
  }
}
