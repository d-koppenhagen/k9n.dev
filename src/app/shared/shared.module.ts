import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { HighlightService } from './highlight.service';

@NgModule({
  declarations: [BlogPreviewComponent],
  imports: [CommonModule, RouterModule],
  providers: [HighlightService],
  exports: [BlogPreviewComponent],
})
export class SharedModule {}
