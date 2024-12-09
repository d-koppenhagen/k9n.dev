import { Component, HostListener } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dk-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [RouterLink],
})
export class MenuComponent {
  constructor(public dialogRef: DialogRef) {
    dialogRef.backdropClick.subscribe(this.closeDialog);
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
