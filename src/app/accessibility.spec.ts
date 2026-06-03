import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import axe, { AxeResults } from 'axe-core';
import { App } from './app';
import { HomePage } from './pages/home/home-page';
import { ContactPage } from './pages/contact/contact-page';
import { ImprintPage } from './pages/imprint/imprint-page';
import { NotFoundPage } from './pages/not-found/not-found-page';
import { BlogListPage } from './pages/blog/blog-list-page';
import { TalksListPage } from './pages/talks/talks-list-page';
import { ProjectsListPage } from './pages/projects/projects-list-page';
import { Navigation } from './components/navigation/navigation';
import { ThemeSwitcher } from './components/theme-switcher/theme-switcher';

/**
 * Helper to run axe-core and assert zero WCAG AA violations.
 * Formats violation details for readable test output.
 */
async function expectNoA11yViolations(element: HTMLElement): Promise<void> {
  const results: AxeResults = await axe.run(element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  });

  if (results.violations.length > 0) {
    const violationMessages = results.violations.map((violation) => {
      const nodes = violation.nodes
        .map((node) => `  - ${node.html}\n    ${node.failureSummary}`)
        .join('\n');
      return `[${violation.id}] ${violation.help} (${violation.impact})\n${nodes}`;
    });

    throw new Error(
      `Expected zero WCAG AA violations but found ${results.violations.length}:\n\n${violationMessages.join('\n\n')}`,
    );
  }
}

describe('Accessibility Tests', () => {
  beforeEach(() => {
    // Mock matchMedia for Theme
    Object.defineProperty(window, 'matchMedia', {
      value: () => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
      }),
      writable: true,
      configurable: true,
    });
  });

  describe('axe-core automated checks - page components', () => {
    it('should have no WCAG AA violations on HomePage', async () => {
      await TestBed.configureTestingModule({
        imports: [HomePage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(HomePage);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on ContactPage', async () => {
      await TestBed.configureTestingModule({
        imports: [ContactPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(ContactPage);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on ImprintPage', async () => {
      await TestBed.configureTestingModule({
        imports: [ImprintPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(ImprintPage);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on NotFoundPage', async () => {
      await TestBed.configureTestingModule({
        imports: [NotFoundPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(NotFoundPage);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on BlogListPage', async () => {
      await TestBed.configureTestingModule({
        imports: [BlogListPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(BlogListPage);
      fixture.detectChanges();
      await fixture.whenStable();

      await expectNoA11yViolations(fixture.nativeElement);
    }, 15000);

    it('should have no WCAG AA violations on TalksListPage', async () => {
      await TestBed.configureTestingModule({
        imports: [TalksListPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(TalksListPage);
      fixture.detectChanges();
      await fixture.whenStable();

      await expectNoA11yViolations(fixture.nativeElement);
    }, 15000);

    it('should have no WCAG AA violations on ProjectsListPage', async () => {
      await TestBed.configureTestingModule({
        imports: [ProjectsListPage],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(ProjectsListPage);
      fixture.detectChanges();
      await fixture.whenStable();

      await expectNoA11yViolations(fixture.nativeElement);
    }, 15000);

    it('should have no WCAG AA violations on Navigation', async () => {
      await TestBed.configureTestingModule({
        imports: [Navigation],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(Navigation);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on ThemeSwitcher', async () => {
      await TestBed.configureTestingModule({
        imports: [ThemeSwitcher],
        providers: [provideRouter([])],
      }).compileComponents();

      const fixture = TestBed.createComponent(ThemeSwitcher);
      fixture.detectChanges();

      await expectNoA11yViolations(fixture.nativeElement);
    });

    it('should have no WCAG AA violations on the full App layout', async () => {
      await TestBed.configureTestingModule({
        imports: [App],
        providers: [
          provideRouter([
            { path: '', component: HomePage },
          ]),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      await expectNoA11yViolations(fixture.nativeElement);
    }, 15000);
  });

  describe('focus management on route change', () => {
    it('should move focus to main content area after navigation', async () => {
      await TestBed.configureTestingModule({
        imports: [App],
        providers: [
          provideRouter([
            { path: '', component: HomePage },
            { path: 'contact', component: ContactPage },
          ]),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      const router = TestBed.inject(Router);
      const mainEl = fixture.nativeElement.querySelector('#main-content') as HTMLElement;

      // Navigate to contact page
      await router.navigate(['/contact']);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.activeElement).toBe(mainEl);
    });

    it('should announce route change via live region', async () => {
      await TestBed.configureTestingModule({
        imports: [App],
        providers: [
          provideRouter([
            { path: '', component: HomePage },
            { path: 'contact', component: ContactPage },
          ]),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      const router = TestBed.inject(Router);

      // Navigate to contact page
      await router.navigate(['/contact']);
      fixture.detectChanges();
      await fixture.whenStable();

      const liveRegion = fixture.nativeElement.querySelector('[aria-live="polite"]') as HTMLElement;
      expect(liveRegion).toBeTruthy();
      // The live region should contain some text (the page title)
      expect(liveRegion.textContent?.trim().length).toBeGreaterThan(0);
    });

    it('should have main content area with tabindex=-1 for programmatic focus', () => {
      TestBed.configureTestingModule({
        imports: [App],
        providers: [provideRouter([])],
      });

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const mainEl = fixture.nativeElement.querySelector('#main-content') as HTMLElement;
      expect(mainEl).toBeTruthy();
      expect(mainEl.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('skip-to-content link', () => {
    it('should have a skip-to-content link as the first focusable element', () => {
      TestBed.configureTestingModule({
        imports: [App],
        providers: [provideRouter([])],
      });

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const allFocusable = fixture.nativeElement.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = allFocusable[0] as HTMLElement;

      expect(firstFocusable.classList.contains('skip-to-content')).toBe(true);
      expect(firstFocusable.getAttribute('href')).toBe('#main-content');
    });

    it('should move focus to main content when skip link is activated', () => {
      TestBed.configureTestingModule({
        imports: [App],
        providers: [provideRouter([])],
      });

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const skipLink = fixture.nativeElement.querySelector('.skip-to-content') as HTMLAnchorElement;
      const mainEl = fixture.nativeElement.querySelector('#main-content') as HTMLElement;

      // Simulate click on skip link
      skipLink.click();
      fixture.detectChanges();

      expect(document.activeElement).toBe(mainEl);
    });

    it('should have skip link target matching main content id', () => {
      TestBed.configureTestingModule({
        imports: [App],
        providers: [provideRouter([])],
      });

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const skipLink = fixture.nativeElement.querySelector('.skip-to-content') as HTMLAnchorElement;
      const targetId = skipLink.getAttribute('href')?.replace('#', '');
      const targetEl = fixture.nativeElement.querySelector(`#${targetId}`);

      expect(targetEl).toBeTruthy();
      expect(targetEl.tagName.toLowerCase()).toBe('main');
    });

    it('should have descriptive text for the skip link', () => {
      TestBed.configureTestingModule({
        imports: [App],
        providers: [provideRouter([])],
      });

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const skipLink = fixture.nativeElement.querySelector('.skip-to-content') as HTMLAnchorElement;
      expect(skipLink.textContent?.trim()).toBe('Zum Inhalt springen');
    });
  });
});
