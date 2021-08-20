import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'dk-text-slot-machine',
  templateUrl: './text-slot-machine.component.html',
  styleUrls: ['./text-slot-machine.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSlotMachineComponent {
  @Input() result: string;

  get letters() {
    return [...this.result];
  }
}
