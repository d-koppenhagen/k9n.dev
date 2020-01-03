import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { HighlightService } from './highlight.service';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [BlogPreviewComponent],
  imports: [CommonModule, RouterModule, TranslocoRootModule],
  providers: [HighlightService],
  exports: [BlogPreviewComponent],
})
export class SharedModule {}
