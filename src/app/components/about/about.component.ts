import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { PersonalTimelineComponent } from '../personal-timeline/personal-timeline.component';

@Component({
  selector: 'dk-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [YouTubePlayerModule, PersonalTimelineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('videoBox') videoBox!: ElementRef;
  youtubePlayerWidth = 300;
  isBrowser = false;

  constructor(
    private cdref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.videoBox?.nativeElement?.clientWidth) {
      this.youtubePlayerWidth = this.videoBox.nativeElement.clientWidth;
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }

  ngAfterViewInit() {
    this.onResize();
    this.cdref.detectChanges();
  }
}
