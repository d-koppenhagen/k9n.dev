import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
  private readonly theme = inject(Theme);

  readonly content = input.required<string>();

  /** Original mermaid source code per block, preserved for re-rendering on theme change. */
  private mermaidSources: string[] = [];
  private mermaidRendered = false;

  protected readonly trustedHtml = computed(() => {
    const html = this.sanitizer.bypassSecurityTrustHtml(this.content());
    this.mermaidSources = [];
    this.mermaidRendered = false;
    this.scheduleMermaidRender();
    return html;
  });

  constructor() {
    // Re-render mermaid diagrams when the theme changes
    effect(() => {
      const resolvedTheme = this.theme.theme();
      if (this.mermaidRendered) {
        void this.reRenderMermaid(resolvedTheme);
      }
    });
  }

  private scheduleMermaidRender(): void {
    afterNextRender(() => this.renderMermaidDiagrams(), { injector: this.injector });
  }

  private async renderMermaidDiagrams(): Promise<void> {
    const el = this.elementRef.nativeElement;
    const mermaidBlocks = el.querySelectorAll<HTMLPreElement>('pre.mermaid');

    if (mermaidBlocks.length === 0) return;

    // Preserve original source before mermaid replaces innerHTML
    this.mermaidSources = Array.from(mermaidBlocks).map(
      (block) => block.textContent ?? '',
    );

    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: this.theme.theme() === 'dark' ? 'dark' : 'default',
      fontFamily: 'var(--font-sans)',
    });

    await mermaid.run({ nodes: mermaidBlocks });
    this.mermaidRendered = true;
  }

  private async reRenderMermaid(resolvedTheme: 'dark' | 'light'): Promise<void> {
    if (this.mermaidSources.length === 0) return;

    const el = this.elementRef.nativeElement;
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
      fontFamily: 'var(--font-sans)',
    });

    const containers = el.querySelectorAll<HTMLPreElement>('pre.mermaid');
    for (let i = 0; i < this.mermaidSources.length; i++) {
      const source = this.mermaidSources[i];
      const container = containers[i];
      if (!source || !container) continue;

      const id = `mermaid-rerender-${crypto.randomUUID()}`;
      try {
        const { svg } = await mermaid.render(id, source);
        container.innerHTML = svg;
      } catch {
        // Keep existing rendered content on failure
      }
    }
  }
}
