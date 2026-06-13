import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Footer } from './footer';

@Component({ template: '' })
class DummyComponent {}

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideRouter([
          { path: 'about', component: DummyComponent },
          { path: 'contact', component: DummyComponent },
          { path: 'imprint', component: DummyComponent },
        ]),
      ],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    return fixture;
  }

  describe('structure', () => {
    it('should render with role="contentinfo" on the host', () => {
      const fixture = createComponent();
      const host = fixture.nativeElement;
      expect(host.getAttribute('role')).toBe('contentinfo');
    });

    it('should render a nav element with aria-label', () => {
      const fixture = createComponent();
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Footer-Navigation');
    });
  });

  describe('navigation links', () => {
    it('should render three footer navigation links', () => {
      const fixture = createComponent();
      const links = fixture.nativeElement.querySelectorAll('.footer-nav a');
      expect(links.length).toBe(3);
    });

    it('should link to /about', () => {
      const fixture = createComponent();
      const links = fixture.nativeElement.querySelectorAll('.footer-nav a');
      const hrefs = Array.from(links).map((l: unknown) => (l as HTMLElement).getAttribute('href'));
      expect(hrefs).toContain('/about');
    });

    it('should link to /contact', () => {
      const fixture = createComponent();
      const links = fixture.nativeElement.querySelectorAll('.footer-nav a');
      const hrefs = Array.from(links).map((l: unknown) => (l as HTMLElement).getAttribute('href'));
      expect(hrefs).toContain('/contact');
    });

    it('should link to /imprint', () => {
      const fixture = createComponent();
      const links = fixture.nativeElement.querySelectorAll('.footer-nav a');
      const hrefs = Array.from(links).map((l: unknown) => (l as HTMLElement).getAttribute('href'));
      expect(hrefs).toContain('/imprint');
    });

    it('should render correct link labels', () => {
      const fixture = createComponent();
      const links = fixture.nativeElement.querySelectorAll('.footer-nav a');
      const labels = Array.from(links).map((l: unknown) => (l as HTMLElement).textContent?.trim());
      expect(labels).toEqual(['Über mich', 'Kontakt', 'Impressum']);
    });
  });

  describe('contribution section', () => {
    it('should render a contribution paragraph', () => {
      const fixture = createComponent();
      const contribute = fixture.nativeElement.querySelector('.footer-contribute');
      expect(contribute).toBeTruthy();
    });

    it('should have a link to GitHub issues', () => {
      const fixture = createComponent();
      const contribute = fixture.nativeElement.querySelector('.footer-contribute');
      const links = contribute.querySelectorAll('a');
      const hrefs = Array.from(links).map((l: unknown) => (l as HTMLElement).getAttribute('href'));
      expect(hrefs).toContain('https://github.com/d-koppenhagen/k9n.dev/issues');
    });

    it('should have external links with rel="noopener noreferrer"', () => {
      const fixture = createComponent();
      const contribute = fixture.nativeElement.querySelector('.footer-contribute');
      const externalLinks = contribute.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach((link: Element) => {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('copyright', () => {
    it('should render a copyright notice with the current year', () => {
      const fixture = createComponent();
      const copyright = fixture.nativeElement.querySelector('.footer-copyright');
      expect(copyright).toBeTruthy();
      expect(copyright.textContent).toContain(new Date().getFullYear().toString());
      expect(copyright.textContent).toContain('Danny Koppenhagen');
    });
  });
});
