import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';
import { BlogDetailPage } from './blog-detail-page';
import { Content } from '../../services/content/content';
import { BlogPost } from '../../models/content.model';

const baseBlogPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Blog Post',
  description: 'A test description',
  author: { name: 'Danny', mail: 'test@test.de' },
  created: '2025-01-15',
  keywords: ['Angular', 'TypeScript'],
  draft: false,
  content: '<p>Content here</p>',
  headings: [],
};

describe('BlogDetailPage - lang attribute', () => {
  function setup(language: 'de' | 'en' | undefined, localeId: string) {
    const post: BlogPost = { ...baseBlogPost, language };
    const contentServiceMock = {
      getBlogPost: () => post,
      getBlogPostsBySeries: () => [],
    };

    TestBed.configureTestingModule({
      imports: [BlogDetailPage],
      providers: [
        provideRouter([]),
        { provide: LOCALE_ID, useValue: localeId },
        { provide: Content, useValue: contentServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map([['slug', 'test-post']])) },
        },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailPage);
    fixture.detectChanges();
    return fixture;
  }

  it('should set lang="en" on title and content when content is English and UI locale is de', () => {
    const fixture = setup('en', 'de');
    const title = fixture.nativeElement.querySelector('.blog-detail__title');
    const content = fixture.nativeElement.querySelector('.blog-detail__content');
    expect(title.getAttribute('lang')).toBe('en');
    expect(content.getAttribute('lang')).toBe('en');
  });

  it('should NOT set lang on title and content when content language matches UI locale (de/de)', () => {
    const fixture = setup('de', 'de');
    const title = fixture.nativeElement.querySelector('.blog-detail__title');
    const content = fixture.nativeElement.querySelector('.blog-detail__content');
    expect(title.getAttribute('lang')).toBeNull();
    expect(content.getAttribute('lang')).toBeNull();
  });

  it('should NOT set lang when content has no language field', () => {
    const fixture = setup(undefined, 'de');
    const title = fixture.nativeElement.querySelector('.blog-detail__title');
    const content = fixture.nativeElement.querySelector('.blog-detail__content');
    expect(title.getAttribute('lang')).toBeNull();
    expect(content.getAttribute('lang')).toBeNull();
  });

  it('should set lang="de" on title and content when content is German and UI locale is en', () => {
    const fixture = setup('de', 'en');
    const title = fixture.nativeElement.querySelector('.blog-detail__title');
    const content = fixture.nativeElement.querySelector('.blog-detail__content');
    expect(title.getAttribute('lang')).toBe('de');
    expect(content.getAttribute('lang')).toBe('de');
  });
});

describe('BlogDetailPage - keyword tag accessibility', () => {
  function setup(keywords: string[]) {
    const post: BlogPost = { ...baseBlogPost, keywords };
    const contentServiceMock = {
      getBlogPost: () => post,
      getBlogPostsBySeries: () => [],
    };

    TestBed.configureTestingModule({
      imports: [BlogDetailPage],
      providers: [
        provideRouter([]),
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: Content, useValue: contentServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map([['slug', 'test-post']])) },
        },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailPage);
    fixture.detectChanges();
    return fixture;
  }

  it('should render keyword links with aria-label describing the filter action', () => {
    const fixture = setup(['Angular', 'TypeScript']);
    const links = fixture.nativeElement.querySelectorAll('.blog-detail__keyword a');
    expect(links[0].getAttribute('aria-label')).toBe('Beiträge filtern nach: Angular');
    expect(links[1].getAttribute('aria-label')).toBe('Beiträge filtern nach: TypeScript');
  });

  it('should render keyword links with a title tooltip', () => {
    const fixture = setup(['Angular']);
    const link = fixture.nativeElement.querySelector('.blog-detail__keyword a');
    expect(link.getAttribute('title')).toBe('Beiträge filtern nach: Angular');
  });

  it('should link keywords to the blog list with the tag as query param', () => {
    const fixture = setup(['Angular']);
    const link = fixture.nativeElement.querySelector('.blog-detail__keyword a');
    expect(link.getAttribute('href')).toBe('/blog?tags=Angular');
  });

  it('should render keywords inside a list with aria-label', () => {
    const fixture = setup(['Angular']);
    const list = fixture.nativeElement.querySelector('.blog-detail__keywords');
    expect(list.getAttribute('aria-label')).toBe('Schlagwörter');
  });

  it('should not render keyword list when no keywords exist', () => {
    const fixture = setup([]);
    const list = fixture.nativeElement.querySelector('.blog-detail__keywords');
    expect(list).toBeNull();
  });
});
