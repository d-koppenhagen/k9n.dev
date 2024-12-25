import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  PLATFORM_ID,
  viewChild,
  inject,
  AfterViewChecked,
} from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faSpotify,
  faDeezer,
  faApple,
} from '@fortawesome/free-brands-svg-icons';

import { PersonalTimelineComponent } from '../personal-timeline/personal-timeline.component';

@Component({
  selector: 'dk-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [YouTubePlayerModule, PersonalTimelineComponent, FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewChecked {
  private cdref = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  readonly videoBox = viewChild<ElementRef>('videoBox');
  youtubePlayerWidth = 300;
  isBrowser = false;
  faLib = inject(FaIconLibrary);

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.faLib.addIcons(faSpotify, faDeezer, faApple);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const videoBox = this.videoBox();
    if (videoBox?.nativeElement?.clientWidth) {
      this.youtubePlayerWidth = videoBox.nativeElement.clientWidth;
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }

  ngAfterViewChecked() {
    this.onResize();
    this.cdref.detectChanges();
  }
}
