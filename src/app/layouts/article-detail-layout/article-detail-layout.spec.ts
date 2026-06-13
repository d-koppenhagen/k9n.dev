import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { ArticleDetailLayout } from './article-detail-layout';

@Component({
  template: `
    <app-article-detail-layout [showSidebar]="showSidebar()">
      <img slot="hero" src="https://example.com/hero.jpg" alt="Hero image" />
      <div slot="header">
        <h1>Test Article Title</h1>
      </div>
      <div slot="content">
        <p>Article content goes here</p>
      </div>
      <div slot="sidebar">
        <nav>Table of Contents</nav>
      </div>
    </app-article-detail-layout>
  `,
  imports: [ArticleDetailLayout],
})
class TestHost {
  showSidebar = signal(true);
}

@Component({
  template: `
    <app-article-detail-layout [showSidebar]="false">
      <div slot="header">
        <h1>No Sidebar Article</h1>
      </div>
      <div slot="content">
        <p>Content without sidebar</p>
      </div>
    </app-article-detail-layout>
  `,
  imports: [ArticleDetailLayout],
})
class NoSidebarHost {}

describe('ArticleDetailLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost, NoSidebarHost],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.nativeElement.querySelector('app-article-detail-layout')).toBeTruthy();
  });

  it('should render an article element', () => {
    const fixture = createComponent();
    const article = fixture.nativeElement.querySelector('article.article-detail-layout');
    expect(article).toBeTruthy();
  });

  it('should project hero content', () => {
    const fixture = createComponent();
    const hero = fixture.nativeElement.querySelector('.article-detail-layout__hero');
    expect(hero.querySelector('img')).toBeTruthy();
    expect(hero.querySelector('img').getAttribute('src')).toBe('https://example.com/hero.jpg');
  });

  it('should project header content', () => {
    const fixture = createComponent();
    const header = fixture.nativeElement.querySelector('.article-detail-layout__header');
    expect(header.querySelector('h1')?.textContent).toBe('Test Article Title');
  });

  it('should project main content', () => {
    const fixture = createComponent();
    const content = fixture.nativeElement.querySelector('.article-detail-layout__content');
    expect(content.querySelector('p')?.textContent).toBe('Article content goes here');
  });

  it('should project sidebar content when showSidebar is true', () => {
    const fixture = createComponent();
    const sidebar = fixture.nativeElement.querySelector('.article-detail-layout__sidebar');
    expect(sidebar).toBeTruthy();
    expect(sidebar.querySelector('nav')?.textContent).toBe('Table of Contents');
  });

  it('should have aria-label on the sidebar', () => {
    const fixture = createComponent();
    const sidebar = fixture.nativeElement.querySelector('.article-detail-layout__sidebar');
    expect(sidebar.getAttribute('aria-label')).toBe('Artikelnavigation');
  });

  it('should add the with-sidebar class to the host when showSidebar is true', () => {
    const fixture = createComponent();
    const host = fixture.nativeElement.querySelector('app-article-detail-layout');
    expect(host.classList.contains('article-detail-layout--with-sidebar')).toBe(true);
  });

  it('should hide the sidebar when showSidebar is false', () => {
    const fixture = createComponent();
    fixture.componentInstance.showSidebar.set(false);
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.article-detail-layout__sidebar');
    expect(sidebar).toBeNull();
  });

  it('should remove the with-sidebar class when showSidebar is false', () => {
    const fixture = createComponent();
    fixture.componentInstance.showSidebar.set(false);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('app-article-detail-layout');
    expect(host.classList.contains('article-detail-layout--with-sidebar')).toBe(false);
  });

  it('should render without sidebar when showSidebar is false from start', () => {
    const fixture = TestBed.createComponent(NoSidebarHost);
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.article-detail-layout__sidebar');
    expect(sidebar).toBeNull();
    const content = fixture.nativeElement.querySelector('.article-detail-layout__content');
    expect(content.querySelector('p')?.textContent).toBe('Content without sidebar');
  });
});
