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
  signal,
  viewChild,
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

  /** Lightbox state */
  protected readonly lightboxSrc = signal<string | null>(null);
  protected readonly lightboxAlt = signal<string>('');
  protected readonly lightboxAriaLabel = computed(
    () => $localize`:aria label|Image lightbox dialog@@markdownContent.lightbox.ariaLabel:Bildvorschau: ` + this.lightboxAlt(),
  );
  protected readonly closeLightboxLabel = $localize`:aria label|Close lightbox button@@markdownContent.lightbox.close:Bildvorschau schließen`;

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');
  private triggerElement: HTMLElement | null = null;

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

    // Set up lightbox after content is rendered to DOM
    effect(() => {
      this.content(); // track content changes
      afterNextRender(() => this.setupImageLightbox(), { injector: this.injector });
    });
  }

  private scheduleMermaidRender(): void {
    afterNextRender(() => this.renderMermaidDiagrams(), { injector: this.injector });
  }

  /** Makes content images interactive and opens the lightbox on click/keyboard activation. */
  private setupImageLightbox(): void {
    const el = this.elementRef.nativeElement;
    const images = el.querySelectorAll<HTMLImageElement>('.markdown-content img');

    for (const img of images) {
      // Skip already-setup images and mermaid diagrams
      if (img.classList.contains('lightbox-trigger')) continue;
      if (img.closest('pre.mermaid')) continue;

      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute(
        'aria-label',
        $localize`:aria label|Enlarge image button@@markdownContent.lightbox.enlarge:Bild vergrößern: ` + (img.alt || ''),
      );
      img.classList.add('lightbox-trigger');

      img.addEventListener('click', () => this.openLightbox(img));
      img.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(img);
        }
      });
    }
  }

  protected openLightbox(img: HTMLImageElement): void {
    this.triggerElement = img;
    this.lightboxSrc.set(img.src);
    this.lightboxAlt.set(img.alt || '');

    const dialog = this.dialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  protected closeLightbox(): void {
    const dialog = this.dialogRef()?.nativeElement;
    dialog?.close();
  }

  protected closeLightboxOnBackdrop(event: MouseEvent): void {
    const dialog = this.dialogRef()?.nativeElement;
    if (event.target === dialog) {
      dialog.close();
    }
  }

  protected onDialogClose(): void {
    // Return focus to the trigger image
    this.triggerElement?.focus();
    this.triggerElement = null;
    this.lightboxSrc.set(null);
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
