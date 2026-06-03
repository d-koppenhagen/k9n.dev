import { computed, Signal, WritableSignal } from '@angular/core';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

/**
 * Filterable content item — minimal interface that all content types satisfy.
 */
export interface FilterableItem {
  title: string;
  description: string;
  keywords: string[];
  language?: 'de' | 'en';
}

/**
 * Result of creating a content filter — provides reactive signals
 * for the filtered items and all available tags.
 */
export interface ContentFilter<T extends FilterableItem> {
  /** All unique tags extracted from the items, sorted alphabetically. */
  allTags: Signal<string[]>;
  /** Items filtered by current search term, selected tags, and language. */
  filteredItems: Signal<T[]>;
  /** Language filter state bound to the `lang` query param. */
  language: WritableSignal<string | null>;
}

/**
 * Creates a reactive content filter bound to URL query params.
 *
 * Must be called in an injection context (component constructor or field initializer)
 * because it uses `linkedQueryParam`.
 *
 * @param items - Signal providing the full list of items to filter.
 * @returns Reactive filter signals for tags, language, and filtered items.
 */
export function createContentFilter<T extends FilterableItem>(
  items: Signal<T[]>,
): ContentFilter<T> {
  const search = linkedQueryParam('q', { replaceUrl: true });
  const tags = linkedQueryParam<string[]>('tags', {
    parse: (value) => (value ? value.split(',').filter(Boolean) : []),
    stringify: (value) => (value.length > 0 ? value.join(',') : null),
    replaceUrl: true,
  });
  const language = linkedQueryParam('lang', { replaceUrl: true });

  const allTags = computed(() => {
    const tagSet = new Set<string>();
    for (const item of items()) {
      for (const keyword of item.keywords) {
        tagSet.add(keyword);
      }
    }
    return [...tagSet].sort();
  });

  const filteredItems = computed(() => {
    let result = items();
    const searchTerm = search()?.toLowerCase() ?? '';
    const selectedTags = tags() ?? [];
    const selectedLang = language();

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm),
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.every((tag) => item.keywords.includes(tag)),
      );
    }

    if (selectedLang === 'de' || selectedLang === 'en') {
      result = result.filter((item) => item.language === selectedLang);
    }

    return result;
  });

  return { allTags, filteredItems, language };
}
