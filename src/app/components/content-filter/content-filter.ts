import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-content-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    Combobox,
    ComboboxPopup,
    ComboboxWidget,
    Listbox,
    Option,
    OverlayModule,
  ],
  templateUrl: './content-filter.html',
  styleUrl: './content-filter.css',
})
export class ContentFilter {
  /** All available tags to display */
  readonly allTags = input<string[]>([]);

  /** Query param signals */
  readonly search = linkedQueryParam('q', { replaceUrl: true });

  readonly tags = linkedQueryParam<string[]>('tags', {
    parse: (value) => (value ? value.split(',').filter(Boolean) : []),
    stringify: (value) => (value.length > 0 ? value.join(',') : null),
    replaceUrl: true,
  });

  /** Language filter query param */
  readonly language = linkedQueryParam('lang', { replaceUrl: true });

  /** Language filter options */
  protected readonly languageOptions = [
    { value: null, label: $localize`:content filter|All languages option@@contentFilter.language.all:Alle` },
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
  ] as const;

  /** Local form model for the search input */
  private readonly filterModel = signal({ search: this.search() ?? '' });
  readonly filterForm = form(this.filterModel);

  /** Combobox expanded state */
  readonly isExpanded = signal(false);

  /** Two-way bound to the listbox */
  readonly selectedTagValues = signal<string[]>(this.tags() ?? []);

  /** Listbox reference */
  private readonly listbox = viewChild(Listbox);
  private readonly options = viewChildren(Option);

  /** Display value for the multiselect trigger */
  readonly tagsDisplayValue = computed(() => {
    const values = this.selectedTagValues();
    if (values.length === 0) {
      return $localize`:content filter|Tags placeholder@@contentFilter.tags.placeholder:Nach Tags filtern...`;
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });

  /** Localized label prefix for remove-filter aria-labels */
  protected readonly removeFilterLabel = $localize`:content filter|Remove filter aria label prefix@@contentFilter.removeFilter.label:Filter entfernen: `;

  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Scroll to active option
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });

    // Reset listbox scroll when closed
    afterRenderEffect(() => {
      if (!this.isExpanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });

    // Sync selectedTagValues → query param
    afterRenderEffect(() => {
      const values = this.selectedTagValues();
      this.tags.set(values);
    });

    // Sync query param → selectedTagValues (back/forward navigation)
    afterRenderEffect(() => {
      const urlTags = this.tags() ?? [];
      const current = this.selectedTagValues();
      if (JSON.stringify(urlTags) !== JSON.stringify(current)) {
        this.selectedTagValues.set(urlTags);
      }
    });
  }

  /** Debounced search input → URL sync */
  protected onSearchInput(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      const value = this.filterModel().search;
      this.search.set(value || null);
    }, 400);
  }

  /** Remove a single tag */
  protected removeTag(tag: string): void {
    this.selectedTagValues.update((current) => current.filter((t) => t !== tag));
  }

  /** Clear all selected tags */
  protected clearAll(): void {
    this.selectedTagValues.set([]);
  }

  /** Set the language filter */
  protected setLanguage(value: string | null): void {
    this.language.set(value);
  }
}
