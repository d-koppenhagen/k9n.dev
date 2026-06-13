import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SeriesNavigation, SeriesPost } from './series-navigation';

@Component({
  template: `
    <app-series-navigation [currentSlug]="currentSlug" [seriesPosts]="seriesPosts" />
  `,
  imports: [SeriesNavigation],
})
class TestHost {
  currentSlug = 'part-2';
  seriesPosts: SeriesPost[] = [];
}

describe('SeriesNavigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [provideRouter([{ path: '**', component: TestHost }])],
    }).compileComponents();
  });

  function createComponent(posts: SeriesPost[], currentSlug = 'part-2') {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.seriesPosts = posts;
    fixture.componentInstance.currentSlug = currentSlug;
    fixture.detectChanges();
    return fixture;
  }

  const seriesPosts: SeriesPost[] = [
    { slug: 'part-3', title: 'Part 3: Advanced', created: '2025-03-01' },
    { slug: 'part-1', title: 'Part 1: Basics', created: '2025-01-01' },
    { slug: 'part-2', title: 'Part 2: Intermediate', created: '2025-02-01' },
  ];

  describe('visibility', () => {
    it('should NOT render when there is only one post in the series', () => {
      const fixture = createComponent([seriesPosts[0]], 'part-3');
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeNull();
    });

    it('should NOT render when seriesPosts is empty', () => {
      const fixture = createComponent([]);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeNull();
    });

    it('should render when there are multiple posts', () => {
      const fixture = createComponent(seriesPosts);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeTruthy();
    });
  });

  describe('structure and accessibility', () => {
    it('should have an aria-label on the nav', () => {
      const fixture = createComponent(seriesPosts);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Beiträge in dieser Serie');
    });

    it('should render a heading with text "Serie"', () => {
      const fixture = createComponent(seriesPosts);
      const heading = fixture.nativeElement.querySelector('h2');
      expect(heading.textContent.trim()).toBe('Serie');
    });

    it('should render an ordered list', () => {
      const fixture = createComponent(seriesPosts);
      const ol = fixture.nativeElement.querySelector('ol');
      expect(ol).toBeTruthy();
    });
  });

  describe('sorting', () => {
    it('should sort posts by created date ascending', () => {
      const fixture = createComponent(seriesPosts);
      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items[0].textContent.trim()).toContain('Part 1');
      expect(items[1].textContent.trim()).toContain('Part 2');
      expect(items[2].textContent.trim()).toContain('Part 3');
    });
  });

  describe('current post indication', () => {
    it('should render the current post as a span with aria-current="page"', () => {
      const fixture = createComponent(seriesPosts, 'part-2');
      const currentSpan = fixture.nativeElement.querySelector('[aria-current="page"]');
      expect(currentSpan).toBeTruthy();
      expect(currentSpan.textContent.trim()).toContain('Part 2: Intermediate');
    });

    it('should NOT render the current post as a link', () => {
      const fixture = createComponent(seriesPosts, 'part-2');
      const links = fixture.nativeElement.querySelectorAll('a');
      const linkTexts = Array.from(links).map((l: unknown) => (l as HTMLElement).textContent?.trim());
      expect(linkTexts).not.toContain('Part 2: Intermediate');
    });

    it('should render other posts as links', () => {
      const fixture = createComponent(seriesPosts, 'part-2');
      const links = fixture.nativeElement.querySelectorAll('a');
      expect(links.length).toBe(2);
    });

    it('should link other posts to /blog/:slug', () => {
      const fixture = createComponent(seriesPosts, 'part-2');
      const links = fixture.nativeElement.querySelectorAll('a');
      const hrefs = Array.from(links).map((l: unknown) => (l as HTMLAnchorElement).getAttribute('href'));
      expect(hrefs).toContain('/blog/part-1');
      expect(hrefs).toContain('/blog/part-3');
    });
  });
});
