import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dk-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [RouterLink],
  standalone: true,
})
export class ContactComponent {}
