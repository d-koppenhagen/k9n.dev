import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PublishedAtBanner } from './published-at-banner';
import type { LinkedPlatform, PublishedAt } from '../../models/content.model';

@Component({
  template: `<app-published-at-banner [publishedAt]="publishedAt" [linked]="linked" />`,
  imports: [PublishedAtBanner],
})
class TestHost {
  publishedAt: PublishedAt | undefined = undefined;
  linked: LinkedPlatform[] | undefined = undefined;
}

describe('PublishedAtBanner', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
  });

  function createComponent(publishedAt?: PublishedAt, linked?: LinkedPlatform[]) {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.publishedAt = publishedAt;
    fixture.componentInstance.linked = linked;
    fixture.detectChanges();
    return fixture;
  }

  describe('publishedAt section', () => {
    it('should NOT render when publishedAt is undefined', () => {
      const fixture = createComponent();
      const aside = fixture.nativeElement.querySelector('.published-at');
      expect(aside).toBeNull();
    });

    it('should render when publishedAt is provided', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post' });
      const aside = fixture.nativeElement.querySelector('.published-at');
      expect(aside).toBeTruthy();
    });

    it('should have an aria-label on the aside', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post' });
      const aside = fixture.nativeElement.querySelector('.published-at');
      expect(aside.getAttribute('aria-label')).toBe('Erstveröffentlichung');
    });

    it('should render the platform name', () => {
      const fixture = createComponent({ name: 'Medium', url: 'https://medium.com/article' });
      const name = fixture.nativeElement.querySelector('.published-at__name');
      expect(name.textContent.trim()).toBe('Medium');
    });

    it('should link to the external URL with target="_blank"', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post' });
      const link = fixture.nativeElement.querySelector('.published-at__link');
      expect(link.getAttribute('href')).toBe('https://dev.to/post');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should render a logo when provided', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post', logo: 'https://dev.to/logo.png' });
      const img = fixture.nativeElement.querySelector('.published-at__logo');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('https://dev.to/logo.png');
      expect(img.getAttribute('alt')).toBe('DEV.to');
    });

    it('should NOT render a logo when not provided', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post' });
      const img = fixture.nativeElement.querySelector('.published-at__logo');
      expect(img).toBeNull();
    });

    it('should render the external link icon with aria-hidden', () => {
      const fixture = createComponent({ name: 'DEV.to', url: 'https://dev.to/post' });
      const icon = fixture.nativeElement.querySelector('.published-at__icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('cross-posted section', () => {
    it('should NOT render when linked is undefined', () => {
      const fixture = createComponent({ name: 'X', url: 'https://x.com' }, undefined);
      const crossPosted = fixture.nativeElement.querySelector('.cross-posted');
      expect(crossPosted).toBeNull();
    });

    it('should NOT render when linked is an empty array', () => {
      const fixture = createComponent({ name: 'X', url: 'https://x.com' }, []);
      const crossPosted = fixture.nativeElement.querySelector('.cross-posted');
      expect(crossPosted).toBeNull();
    });

    it('should render when linked has items', () => {
      const linked: LinkedPlatform[] = [
        { platform: 'devTo', url: 'https://dev.to/post', label: 'DEV.to' },
        { platform: 'medium', url: 'https://medium.com/post', label: 'Medium' },
      ];
      const fixture = createComponent(undefined, linked);
      const crossPosted = fixture.nativeElement.querySelector('.cross-posted');
      expect(crossPosted).toBeTruthy();
    });

    it('should have an aria-label on the aside', () => {
      const linked: LinkedPlatform[] = [
        { platform: 'devTo', url: 'https://dev.to/post', label: 'DEV.to' },
      ];
      const fixture = createComponent(undefined, linked);
      const aside = fixture.nativeElement.querySelector('.cross-posted');
      expect(aside.getAttribute('aria-label')).toBe('Auch veröffentlicht auf');
    });

    it('should render one link per linked platform', () => {
      const linked: LinkedPlatform[] = [
        { platform: 'devTo', url: 'https://dev.to/post', label: 'DEV.to' },
        { platform: 'medium', url: 'https://medium.com/post', label: 'Medium' },
      ];
      const fixture = createComponent(undefined, linked);
      const links = fixture.nativeElement.querySelectorAll('.cross-posted__link');
      expect(links.length).toBe(2);
    });

    it('should render platform labels', () => {
      const linked: LinkedPlatform[] = [
        { platform: 'devTo', url: 'https://dev.to/post', label: 'DEV.to' },
      ];
      const fixture = createComponent(undefined, linked);
      const name = fixture.nativeElement.querySelector('.cross-posted__name');
      expect(name.textContent.trim()).toBe('DEV.to');
    });

    it('should open links in a new tab with noopener', () => {
      const linked: LinkedPlatform[] = [
        { platform: 'devTo', url: 'https://dev.to/post', label: 'DEV.to' },
      ];
      const fixture = createComponent(undefined, linked);
      const link = fixture.nativeElement.querySelector('.cross-posted__link');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
