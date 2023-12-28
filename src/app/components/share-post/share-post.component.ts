import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@Component({
  selector: 'dk-share-post',
  standalone: true,
  //imports: [ShareButtonsModule, ShareIconsModule],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.css',
})
export class SharePostComponent implements AfterViewInit {
  @Input({ required: true }) description = '';
  @ViewChild('shareBtnBox') shareBtnBox!: ElementRef;
  shareBtnCnt = 5;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.shareBtnBox?.nativeElement?.clientWidth) {
      return;
    }
    if (this.shareBtnBox.nativeElement.clientWidth < 320) {
      this.shareBtnCnt = 2;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 410) {
      this.shareBtnCnt = 3;
    } else if (this.shareBtnBox.nativeElement.clientWidth < 480) {
      this.shareBtnCnt = 4;
    } else {
      this.shareBtnCnt = 5;
    }
  }

  get url() {
    return window.location.href;
  }

  ngAfterViewInit() {
    this.onResize();
  }
}
