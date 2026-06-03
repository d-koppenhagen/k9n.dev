import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a skip-to-content link as first focusable element', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const skipLink = compiled.querySelector('.skip-to-content') as HTMLAnchorElement;
    expect(skipLink).toBeTruthy();
    expect(skipLink.textContent?.trim()).toBe('Zum Inhalt springen');
    expect(skipLink.getAttribute('href')).toBe('#main-content');
  });

  it('should have semantic HTML structure with header, main, and footer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('main')).toBeTruthy();
    expect(compiled.querySelector('[role="contentinfo"]')).toBeTruthy();
  });

  it('should have a main element with tabindex for focus management', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const main = fixture.nativeElement.querySelector('main');
    expect(main.getAttribute('tabindex')).toBe('-1');
    expect(main.getAttribute('id')).toBe('main-content');
  });

  it('should have footer links to About, Contact and Imprint', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footerLinks = compiled.querySelectorAll('.footer-nav a');
    const hrefs = Array.from(footerLinks).map(link => link.getAttribute('href'));
    expect(hrefs).toContain('/about');
    expect(hrefs).toContain('/contact');
    expect(hrefs).toContain('/imprint');
  });

  it('should have a live region for route announcements', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const liveRegion = compiled.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
    expect(liveRegion?.getAttribute('role')).toBe('status');
  });

  it('should have a footer navigation with aria-label', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footerNav = compiled.querySelector('app-footer nav');
    expect(footerNav?.getAttribute('aria-label')).toBe('Footer-Navigation');
  });
});
