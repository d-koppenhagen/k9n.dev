import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'dk-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  menuClicked() {
    this.closeMenu.emit(true);
  }
}
