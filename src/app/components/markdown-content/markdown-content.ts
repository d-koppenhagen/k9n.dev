import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-content.html',
  styleUrl: './markdown-content.css',
})
export class MarkdownContent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input.required<string>();

  protected readonly trustedHtml = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.content()),
  );
}
