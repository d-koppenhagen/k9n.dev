import { ScrollService } from '../../scroll.service';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeadingData, getHeadingList } from 'marked-gfm-heading-id';

@Component({
  selector: 'dk-sticky-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sticky-navigation.component.html',
  styleUrl: './sticky-navigation.component.scss',
})
export class StickyNavigationComponent {
  @Input() content?: string;

  headlines: HeadingData[] = [];

  constructor(
    private scrollService: ScrollService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.headlines = getHeadingList();
  }

  getNavTextFromHeadline(input: string) {
    return input.replace(/<[^>]*>/g, '');
  }
}
