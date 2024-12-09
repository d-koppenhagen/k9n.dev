import { injectContentFiles } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { PreviewComponent } from '../../components/preview/preview.component';
import { PostAttributes } from '../../types';

@Component({
  imports: [RouterOutlet, RouterLink, AsyncPipe, PreviewComponent],
  styles: `
    .wrapper {
      margin-top: 0;
    }
  `,
  template: `
    <section class="wrapper alt">
      <div class="inner">
        <h2 class="major">Meine Projekte</h2>
        <dk-preview content="projects" [posts]="posts"></dk-preview>
      </div>
    </section>
  `,
})
export default class ProjectsPage {
  readonly posts = injectContentFiles<PostAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/projects/');
  });
}
