import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(
    @Inject(DOCUMENT) private dom: Document,
    readonly viewportScroller: ViewportScroller,
  ) {}

  scrollToElement(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 100);
  }
  scrollToPosition(position: [number, number]) {
    setTimeout(() => {
      this.viewportScroller.scrollToPosition(position);
    }, 100);
  }

  scrollToTop() {
    this.scrollToPosition([0, 0]);
  }
}
