import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextSlotMachineComponent } from '../text-slot-machine/text-slot-machine.component';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [RouterLink, TextSlotMachineComponent],
})
export class HeaderComponent {
  expanded = false;

  onMouseEnter() {
    this.checkScreenWidth();
  }

  onMouseLeave() {
    this.expanded = false;
  }

  private checkScreenWidth() {
    if (window?.innerHeight) {
      const screenWidth = window.innerWidth;
      this.expanded = screenWidth > 900;
    }
  }
}
