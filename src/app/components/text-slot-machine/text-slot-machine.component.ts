import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TextSlotComponent } from '../text-slot/text-slot.component';

@Component({
  selector: 'dk-text-slot-machine',
  templateUrl: './text-slot-machine.component.html',
  styleUrl: './text-slot-machine.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextSlotComponent],
})
export class TextSlotMachineComponent {
  readonly result = input.required<string>();

  get letters() {
    return [...this.result()];
  }
}
