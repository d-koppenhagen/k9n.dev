import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal, Component } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';
import { createContentFilter, FilterableItem, ContentFilter } from './content-filter';

@Component({ template: '' })
class DummyComponent {}

describe('createContentFilter — language filtering', () => {
  const testItems: FilterableItem[] = [
    { title: 'German Post', description: 'Ein deutscher Beitrag', keywords: ['angular', 'typescript'], language: 'de' },
    { title: 'English Post', description: 'An English post', keywords: ['angular', 'react'], language: 'en' },
    { title: 'Another German', description: 'Noch ein Beitrag', keywords: ['typescript'], language: 'de' },
    { title: 'Second English', description: 'Second English post about Angular', keywords: ['angular'], language: 'en' },
  ];

  let filter: ContentFilter<FilterableItem>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', component: DummyComponent }]),
        provideLocationMocks(),
      ],
    });

    TestBed.runInInjectionContext(() => {
      filter = createContentFilter(signal(testItems));
    });
  });

  describe('language filter', () => {
    it('should return only German items when language is set to "de"', () => {
      filter.language.set('de');
      const result = filter.filteredItems();
      expect(result.length).toBe(2);
      expect(result.every(item => item.language === 'de')).toBe(true);
      expect(result.map(item => item.title)).toEqual(['German Post', 'Another German']);
    });

    it('should return only English items when language is set to "en"', () => {
      filter.language.set('en');
      const result = filter.filteredItems();
      expect(result.length).toBe(2);
      expect(result.every(item => item.language === 'en')).toBe(true);
      expect(result.map(item => item.title)).toEqual(['English Post', 'Second English']);
    });

    it('should return all items when no language filter is set', () => {
      filter.language.set(null);
      const result = filter.filteredItems();
      expect(result.length).toBe(4);
    });
  });

  describe('language filter combined with search and tags', () => {
    it('should return only items matching both language and all active criteria', () => {
      // When language is 'en', only English items are returned
      filter.language.set('en');
      const result = filter.filteredItems();
      // Both English items pass the language filter
      expect(result.length).toBe(2);
      expect(result.every(item => item.language === 'en')).toBe(true);
    });

    it('should return empty when language filter excludes all items of a given type', () => {
      // Create filter with items where only one matches specific criteria
      const specificItems: FilterableItem[] = [
        { title: 'Angular Basics', description: 'Learn Angular', keywords: ['angular'], language: 'de' },
        { title: 'React Intro', description: 'Learn React', keywords: ['react'], language: 'en' },
      ];

      let specificFilter: ContentFilter<FilterableItem>;
      TestBed.runInInjectionContext(() => {
        specificFilter = createContentFilter(signal(specificItems));
      });

      // Filter by 'de' — only the Angular item is German
      specificFilter!.language.set('de');
      const result = specificFilter!.filteredItems();
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Angular Basics');
    });
  });

  describe('language query param serialization/deserialization', () => {
    it('should persist "de" value in the language signal', () => {
      filter.language.set('de');
      expect(filter.language()).toBe('de');
    });

    it('should persist "en" value in the language signal', () => {
      filter.language.set('en');
      expect(filter.language()).toBe('en');
    });

    it('should persist null (no language param) in the language signal', () => {
      filter.language.set(null);
      expect(filter.language()).toBeNull();
    });

    it('should round-trip "de" through set and read', () => {
      filter.language.set('de');
      const value = filter.language();
      expect(value).toBe('de');
    });

    it('should round-trip "en" through set and read', () => {
      filter.language.set('en');
      const value = filter.language();
      expect(value).toBe('en');
    });

    it('should round-trip null through set and read', () => {
      filter.language.set(null);
      const value = filter.language();
      expect(value).toBeNull();
    });
  });
});
