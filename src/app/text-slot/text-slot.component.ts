import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'dk-text-slot',
  templateUrl: './text-slot.component.html',
  styleUrls: ['./text-slot.component.css'],
  animations: [
    trigger('slotSpinner', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state(
        'out',
        style({ opacity: 0, display: 'none', transform: 'translateY(-100%)' }),
      ),
      transition('* => out', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.2s', style({ transform: 'translateY(-100%)', opacity: 0 })),
      ]),
      transition('* => in', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.1s', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSlotComponent implements OnInit {
  @Input() result: string;
  currentIndex = 0;
  intervalInstance: ReturnType<typeof setTimeout>;
  chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'];
  slots = this.chars.map((char) => ({ value: char, state: 'out' }));

  constructor(
    private changeDetector: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  get matchValue() {
    return this.result.toUpperCase();
  }

  ngOnInit() {
    this.animateSpin();
  }

  animateSpin() {
    this.ngZone.runOutsideAngular(() => {
      const randomSlotShiftTime = Math.floor(Math.random() * 100) + 150;
      this.slots.forEach((card) => (card.state = 'out'));
      this.currentIndex = Math.floor(Math.random() * this.slots.length);
      this.slots[this.currentIndex].state = 'in';

      this.intervalInstance = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex === this.slots.length) {
          this.currentIndex = 0;
        }
        if (this.currentIndex !== 0) {
          this.slots[this.currentIndex - 1].state = 'out';
        } else {
          this.slots[this.slots.length - 1].state = 'out';
        }
        this.slots[this.currentIndex].state = 'in';

        const itemIndex = this.slots.findIndex(
          (slot) => slot.value === this.matchValue,
        );
        if (this.currentIndex === itemIndex) {
          clearInterval(this.intervalInstance);
        }
        this.changeDetector.detectChanges();
      }, randomSlotShiftTime);
    });
  }
}
