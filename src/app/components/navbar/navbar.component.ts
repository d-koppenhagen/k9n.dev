import { Component, inject, signal } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dk-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [DialogModule, FontAwesomeModule],
})
export class NavbarComponent {
  private readonly dialog = inject(Dialog);
  dialogRef = signal<DialogRef<string> | null>(null);
  private faLib = inject(FaIconLibrary);

  constructor() {
    this.faLib.addIcons(faBars);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openDialog();
    }
  }

  openDialog(): void {
    if (this.dialogRef()) {
      this.dialog.closeAll();
      this.dialogRef.set(null);
    } else {
      const ref = this.dialog.open<string>(MenuComponent, {
        ariaModal: true,
        hasBackdrop: true,
        closeOnNavigation: true,
        closeOnDestroy: true,
        disableClose: false,
      });
      this.dialogRef.set(ref);
      ref.closed.subscribe(() => {
        this.dialogRef.set(null);
      });
    }
  }
}
