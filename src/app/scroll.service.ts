import { ViewportScroller } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  readonly viewportScroller = inject(ViewportScroller);
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
