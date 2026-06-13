import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TableOfContents, Heading } from './table-of-contents';

@Component({
  template: `<app-table-of-contents [headings]="headings" />`,
  imports: [TableOfContents],
})
class TestHost {
  headings: Heading[] = [];
}

describe('TableOfContents', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function createComponent(headings: Heading[] = []) {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.headings = headings;
    fixture.detectChanges();
    return fixture;
  }

  const sampleHeadings: Heading[] = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'getting-started', text: 'Getting Started', level: 2 },
    { id: 'installation', text: 'Installation', level: 3 },
    { id: 'conclusion', text: 'Conclusion', level: 2 },
  ];

  describe('rendering', () => {
    it('should not render the nav when headings are empty', () => {
      const fixture = createComponent([]);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeNull();
    });

    it('should render a nav element when headings are provided', () => {
      const fixture = createComponent(sampleHeadings);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeTruthy();
    });

    it('should have an aria-label on the nav element', () => {
      const fixture = createComponent(sampleHeadings);
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Inhaltsverzeichnis');
    });

    it('should render a heading with title "Inhalt"', () => {
      const fixture = createComponent(sampleHeadings);
      const heading = fixture.nativeElement.querySelector('h2');
      expect(heading.textContent.trim()).toBe('Inhalt');
    });

    it('should render one list item per heading', () => {
      const fixture = createComponent(sampleHeadings);
      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items.length).toBe(4);
    });

    it('should render heading text as link innerHTML', () => {
      const fixture = createComponent(sampleHeadings);
      const links = fixture.nativeElement.querySelectorAll('a');
      expect(links[0].textContent.trim()).toBe('Introduction');
      expect(links[2].textContent.trim()).toBe('Installation');
    });
  });

  describe('hierarchy styling', () => {
    it('should apply h3 class to level-3 headings', () => {
      const fixture = createComponent(sampleHeadings);
      const items = fixture.nativeElement.querySelectorAll('li');
      // 'Installation' is index 2, level 3
      expect(items[2].classList.contains('toc__item--h3')).toBe(true);
    });

    it('should NOT apply h3 class to level-2 headings', () => {
      const fixture = createComponent(sampleHeadings);
      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items[0].classList.contains('toc__item--h3')).toBe(false);
      expect(items[1].classList.contains('toc__item--h3')).toBe(false);
    });
  });

  describe('fragment links', () => {
    it('should use routerLink with fragment for each heading', () => {
      const fixture = createComponent(sampleHeadings);
      const links = fixture.nativeElement.querySelectorAll('a');
      // Angular routerLink with fragment generates href like /current-route#fragment
      // In test environment with empty route, it should contain the fragment
      expect(links[0].getAttribute('href')).toContain('#introduction');
      expect(links[1].getAttribute('href')).toContain('#getting-started');
      expect(links[2].getAttribute('href')).toContain('#installation');
      expect(links[3].getAttribute('href')).toContain('#conclusion');
    });
  });

  describe('HTML content in heading text', () => {
    it('should render HTML in heading text via innerHTML', () => {
      const headings: Heading[] = [
        { id: 'scully-lib', text: 'The <code>ScullyLibModule</code>', level: 2 },
      ];
      const fixture = createComponent(headings);
      const link = fixture.nativeElement.querySelector('a');
      const code = link.querySelector('code');
      expect(code).toBeTruthy();
      expect(code.textContent).toBe('ScullyLibModule');
    });
  });
});
