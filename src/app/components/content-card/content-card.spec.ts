import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ContentCard, CardThumbnail } from './content-card';
import { Component, LOCALE_ID } from '@angular/core';

@Component({
  template: `
    <app-content-card
      [title]="title"
      [description]="description"
      [date]="date"
      [routeLink]="routeLink"
      [thumbnail]="thumbnail"
      [eventName]="eventName"
      [language]="language"
    />
  `,
  imports: [ContentCard],
})
class TestHostComponent {
  title = 'Test Post Title';
  description = 'A short description of the test post.';
  date = '2025-01-15';
  routeLink = '/blog/test-post';
  thumbnail: CardThumbnail | undefined = undefined;
  eventName: string | undefined = undefined;
  language: string | undefined = undefined;
}

describe('ContentCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideRouter([{ path: '**', component: TestHostComponent }]),
        { provide: LOCALE_ID, useValue: 'de' },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('app-content-card');
    expect(card).toBeTruthy();
  });

  it('should render the title as an h3 heading', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h3');
    expect(heading).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Test Post Title');
  });

  it('should render the description', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const description = fixture.nativeElement.querySelector('.card__description');
    expect(description.textContent.trim()).toBe('A short description of the test post.');
  });

  it('should render the date in a time element', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const time = fixture.nativeElement.querySelector('time');
    expect(time).toBeTruthy();
    expect(time.getAttribute('datetime')).toBe('2025-01-15');
    expect(time.textContent.trim()).toBe('2025-01-15');
  });

  it('should not render event name when not provided', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const event = fixture.nativeElement.querySelector('.card__event');
    expect(event).toBeNull();
  });

  it('should render event name when provided', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.eventName = 'NG-DE 2025';
    fixture.detectChanges();
    const event = fixture.nativeElement.querySelector('.card__event');
    expect(event).toBeTruthy();
    expect(event.textContent.trim()).toBe('NG-DE 2025');
  });

  it('should not render image when no thumbnail is provided', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
  });

  it('should render image with descriptive alt text when thumbnail is provided', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.thumbnail = { header: '/assets/images/test.jpg' };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('');
  });

  it('should prefer card thumbnail over header thumbnail', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.thumbnail = {
      header: '/assets/images/header.jpg',
      card: '/assets/images/card.jpg',
    };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    // NgOptimizedImage sets the src attribute based on the ngSrc input
    expect(img.getAttribute('src')).toContain('/assets/images/card.jpg');
  });

  it('should use semantic article element', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const article = fixture.nativeElement.querySelector('article');
    expect(article).toBeTruthy();
  });

  it('should have a link with aria-label matching the title', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.card__link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('aria-label')).toBe('Test Post Title');
  });

  it('should link to the correct route', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.card__link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/blog/test-post');
  });

  describe('lang attribute for content language', () => {
    it('should set lang on title and description when content language differs from UI locale', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.language = 'en';
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.card__title');
      const description = fixture.nativeElement.querySelector('.card__description');
      expect(title.getAttribute('lang')).toBe('en');
      expect(description.getAttribute('lang')).toBe('en');
    });

    it('should NOT set lang on title and description when content language matches UI locale', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.language = 'de';
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.card__title');
      const description = fixture.nativeElement.querySelector('.card__description');
      expect(title.getAttribute('lang')).toBeNull();
      expect(description.getAttribute('lang')).toBeNull();
    });

    it('should NOT set lang when no language is provided', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.language = undefined;
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.card__title');
      const description = fixture.nativeElement.querySelector('.card__description');
      expect(title.getAttribute('lang')).toBeNull();
      expect(description.getAttribute('lang')).toBeNull();
    });
  });

  describe('lang attribute with en locale', () => {
    beforeEach(async () => {
      await TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [TestHostComponent],
          providers: [
            provideRouter([{ path: '**', component: TestHostComponent }]),
            { provide: LOCALE_ID, useValue: 'en' },
          ],
        })
        .compileComponents();
    });

    it('should set lang="de" when content is German and UI locale is English', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.language = 'de';
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.card__title');
      const description = fixture.nativeElement.querySelector('.card__description');
      expect(title.getAttribute('lang')).toBe('de');
      expect(description.getAttribute('lang')).toBe('de');
    });

    it('should NOT set lang when content is English and UI locale is English', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.language = 'en';
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.card__title');
      const description = fixture.nativeElement.querySelector('.card__description');
      expect(title.getAttribute('lang')).toBeNull();
      expect(description.getAttribute('lang')).toBeNull();
    });
  });
});
