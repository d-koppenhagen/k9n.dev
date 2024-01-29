import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'dk-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [MenuComponent, DialogModule],
  standalone: true,
})
export class NavbarComponent {
  constructor(public dialog: Dialog) {}

  openDialog(): void {
    this.dialog.open<string>(MenuComponent, {
      ariaModal: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      closeOnDestroy: true,
      disableClose: false,
    });
  }
}
