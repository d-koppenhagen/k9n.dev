import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink],
})
export class HeaderComponent {}
