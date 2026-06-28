import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MermaidRender } from '../../directives/mermaid-render/mermaid-render';
import { ImageLightbox } from '../image-lightbox/image-lightbox';

@Component({
  selector: 'app-markdown-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-content.html',
  styleUrl: './markdown-content.css',
  imports: [MermaidRender, ImageLightbox],
})
export class MarkdownContent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input.required<string>();

  protected readonly trustedHtml = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.content()),
  );
}
