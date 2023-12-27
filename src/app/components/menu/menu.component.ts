import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dk-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class MenuComponent {
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();

  menuClicked() {
    this.closeMenu.emit(true);
  }
}
