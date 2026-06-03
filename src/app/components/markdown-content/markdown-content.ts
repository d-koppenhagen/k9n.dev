import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-markdown-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-content.html',
  styleUrl: './markdown-content.css',
})
export class MarkdownContent {
  readonly content = input.required<string>();
}
