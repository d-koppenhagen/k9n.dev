import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-lightbox.html',
  styleUrl: './image-lightbox.css',
})
export class ImageLightbox {
  private readonly injector = inject(Injector);

  /**
   * Reference to the container element whose images should be made interactive.
   * Pass the native element of the content container.
   */
  readonly container = input.required<HTMLElement>();

  /**
   * Trigger input — whenever this value changes, images in the container are
   * re-scanned. Typically bound to the content signal.
   */
  readonly trigger = input<unknown>();

  /** Lightbox state */
  protected readonly lightboxSrc = signal<string | null>(null);
  protected readonly lightboxAlt = signal<string>('');
  protected readonly lightboxAriaLabel = computed(
    () =>
      $localize`:aria label|Image lightbox dialog@@imageLightbox.ariaLabel:Bildvorschau: ` +
      this.lightboxAlt(),
  );
  protected readonly closeLightboxLabel =
    $localize`:aria label|Close lightbox button@@imageLightbox.close:Bildvorschau schließen`;

  private readonly dialogRef =
    viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');
  private triggerElement: HTMLElement | null = null;

  constructor() {
    // Set up lightbox after content is rendered to DOM
    effect(() => {
      this.trigger(); // track content changes
      const container = this.container();
      if (!container) return;
      afterNextRender(() => this.setupImageLightbox(container), {
        injector: this.injector,
      });
    });
  }

  /** Makes content images interactive and opens the lightbox on click/keyboard activation. */
  private setupImageLightbox(container: HTMLElement): void {
    const images = container.querySelectorAll<HTMLImageElement>('img');

    for (const img of images) {
      // Skip already-setup images and mermaid diagrams
      if (img.classList.contains('lightbox-trigger')) continue;
      if (img.closest('pre.mermaid')) continue;

      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute(
        'aria-label',
        $localize`:aria label|Enlarge image button@@imageLightbox.enlarge:Bild vergrößern: ` +
          (img.alt || ''),
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
}
