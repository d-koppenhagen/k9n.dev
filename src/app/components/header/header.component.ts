import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextSlotMachineComponent } from '../text-slot-machine/text-slot-machine.component';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [RouterLink, TextSlotMachineComponent],
})
export class HeaderComponent implements OnInit {
  expanded = false;

  constructor() {}

  ngOnInit() {}
}
