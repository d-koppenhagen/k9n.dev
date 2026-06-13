import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { SmartLink } from './smart-link';

@Component({
  template: `
    <a
      [appSmartLink]="internalRoute"
      [externalUrl]="externalUrl"
      [hreflang]="hreflang"
      [ariaLabel]="ariaLabel"
    >Link Text</a>
  `,
  imports: [SmartLink],
})
class TestHost {
  internalRoute = '/blog/my-post';
  externalUrl: string | undefined = undefined;
  hreflang: string | undefined = undefined;
  ariaLabel: string | undefined = undefined;
}

@Component({ template: '' })
class DummyComponent {}

describe('SmartLink', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [
        provideRouter([
          { path: 'blog/my-post', component: DummyComponent },
          { path: '**', component: DummyComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  function createComponent() {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    return fixture;
  }

  describe('internal link behavior', () => {
    it('should set href to the internal route', () => {
      const fixture = createComponent();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('href')).toBe('/blog/my-post');
    });

    it('should NOT set target for internal links', () => {
      const fixture = createComponent();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('target')).toBeNull();
    });

    it('should NOT set rel for internal links', () => {
      const fixture = createComponent();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('rel')).toBeNull();
    });

    it('should navigate via Router on click', () => {
      const fixture = createComponent();
      const navigateSpy = vi.spyOn(router, 'navigateByUrl');
      const link = fixture.nativeElement.querySelector('a');
      link.click();
      expect(navigateSpy).toHaveBeenCalledWith('/blog/my-post');
    });

    it('should NOT set hreflang for internal links', () => {
      const fixture = createComponent();
      fixture.componentInstance.hreflang = 'en';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('hreflang')).toBeNull();
    });
  });

  describe('external link behavior', () => {
    it('should set href to the external URL', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('href')).toBe('https://dev.to/post');
    });

    it('should set target="_blank" for external links', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('should set rel="noopener noreferrer" for external links', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should NOT navigate via Router on click for external links', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.detectChanges();
      const navigateSpy = vi.spyOn(router, 'navigateByUrl');
      const link = fixture.nativeElement.querySelector('a');
      link.click();
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should set hreflang when provided for external links', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.componentInstance.hreflang = 'en';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('hreflang')).toBe('en');
    });
  });

  describe('aria-label', () => {
    it('should NOT set aria-label when not provided', () => {
      const fixture = createComponent();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('aria-label')).toBeNull();
    });

    it('should set aria-label for internal links without suffix', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.ariaLabel = 'Read article';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('aria-label')).toBe('Read article');
    });

    it('should append "(opens in a new tab)" for external links', () => {
      const fixture = TestBed.createComponent(TestHost);
      fixture.componentInstance.externalUrl = 'https://dev.to/post';
      fixture.componentInstance.ariaLabel = 'Read article';
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('aria-label')).toBe('Read article (opens in a new tab)');
    });
  });
});
