import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'dk-share-post',
  standalone: true,
  //imports: [ShareButtonsModule, ShareIconsModule],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.css',
})
export class SharePostComponent implements AfterViewInit {
  readonly description = input.required<string>();
  readonly shareBtnBox = viewChild.required<ElementRef>('shareBtnBox');
  shareBtnCnt = 5;

  @HostListener('window:resize', ['$event'])
  onResize() {
    const shareBtnBox = this.shareBtnBox();
    if (!shareBtnBox?.nativeElement?.clientWidth) {
      return;
    }
    if (shareBtnBox.nativeElement.clientWidth < 320) {
      this.shareBtnCnt = 2;
    } else if (shareBtnBox.nativeElement.clientWidth < 410) {
      this.shareBtnCnt = 3;
    } else if (shareBtnBox.nativeElement.clientWidth < 480) {
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
