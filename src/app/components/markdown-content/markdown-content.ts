import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Injector,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Theme } from '../../services/theme/theme';

@Component({
  selector: 'app-markdown-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown-content.html',
  styleUrl: './markdown-content.css',
})
export class MarkdownContent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly themeService = inject(Theme);

  readonly content = input.required<string>();

  protected readonly trustedHtml = computed(() => {
    const html = this.sanitizer.bypassSecurityTrustHtml(this.content());
    this.scheduleMermaidRender();
    return html;
  });

  private scheduleMermaidRender(): void {
    afterNextRender(() => this.renderMermaidDiagrams(), { injector: this.injector });
  }

  private async renderMermaidDiagrams(): Promise<void> {
    const el = this.elementRef.nativeElement;
    const mermaidBlocks = el.querySelectorAll<HTMLPreElement>('pre.mermaid');

    if (mermaidBlocks.length === 0) return;

    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'var(--font-sans)',
      themeVariables: {
        darkMode: this.themeService.preference() === 'dark'
      }
    });

    await mermaid.run({ nodes: mermaidBlocks });
  }
}
