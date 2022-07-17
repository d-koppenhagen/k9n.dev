import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'dk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() post: ScullyRoute;
  constructor(private router: Router) {}

  handleClick(post: ScullyRoute) {
    if (post.publishedAt?.linkExternal) {
      window.open(post.publishedAt.url, '_blank');
    } else {
      this.router.navigateByUrl(post.route);
    }
  }
}
