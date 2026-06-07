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
import { DatePipe } from '@angular/common';
import { MarkdownContent } from '../../components/markdown-content/markdown-content';
import { PublishedAtBanner } from '../../components/published-at-banner/published-at-banner';
import { StatusBadge } from '../../components/status-badge/status-badge';
import { MetaManager } from '../../services/meta/meta';
import { Content } from '../../services/content/content';

@Component({
  selector: 'app-project-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownContent, PublishedAtBanner, StatusBadge, DatePipe],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css',
})
export class ProjectDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly metaService = inject(MetaManager);
  private readonly contentService = inject(Content);
  private readonly localeId = inject(LOCALE_ID);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
  );

  protected readonly project = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return undefined;
    return this.contentService.getProject(currentSlug);
  });

  protected readonly contentLang = computed(() => {
    const proj = this.project();
    return proj?.language && proj.language !== this.localeId ? proj.language : null;
  });

  constructor() {
    effect(() => {
      const currentProject = this.project();
      if (currentProject) {
        this.metaService.updateMeta({
          title: currentProject.title,
          description: currentProject.description,
          url: `https://k9n.dev/projects/${currentProject.slug}`,
          type: 'article',
        });
      }
    });
  }
}
