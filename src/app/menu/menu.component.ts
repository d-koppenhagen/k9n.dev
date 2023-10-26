import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'dk-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();

  menuClicked() {
    this.closeMenu.emit(true);
  }
}
