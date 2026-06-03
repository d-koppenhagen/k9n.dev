import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MarkdownContent } from '../../components/markdown-content/markdown-content';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';

@Component({
  selector: 'app-talk-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownContent],
  templateUrl: './talk-detail-page.html',
  styleUrl: './talk-detail-page.css',
})
export class TalkDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);
  private readonly localeId = inject(LOCALE_ID);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly talk = computed(() => {
    const currentSlug = this.slug();
    return this.contentService.getTalk(currentSlug) ?? null;
  });

  protected readonly contentLang = computed(() => {
    const t = this.talk();
    return t?.language && t.language !== this.localeId ? t.language : null;
  });

  constructor() {
    effect(() => {
      const currentTalk = this.talk();
      if (currentTalk) {
        this.metaService.updateMeta({
          title: currentTalk.title,
          description: currentTalk.description,
          url: `https://k9n.dev/talks/${currentTalk.slug}`,
          type: 'article',
        });
      }
    });
  }
}
