import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'dk-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [MenuComponent],
  standalone: true,
})
export class NavbarComponent {
  menuOpen = false;

  constructor() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
