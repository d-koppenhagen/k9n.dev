import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextSlotComponent } from '../text-slot/text-slot.component';

@Component({
  selector: 'dk-text-slot-machine',
  templateUrl: './text-slot-machine.component.html',
  styleUrl: './text-slot-machine.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextSlotComponent],
})
export class TextSlotMachineComponent {
  @Input() result!: string;

  get letters() {
    return [...this.result];
  }
}
