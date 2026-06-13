import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ContentDetailLayout } from './content-detail-layout';

@Component({
  template: `
    <app-content-detail-layout>
      <div slot="header">
        <h1>Test Title</h1>
        <p>Test description</p>
      </div>
      <div slot="content">
        <p>Main content here</p>
      </div>
    </app-content-detail-layout>
  `,
  imports: [ContentDetailLayout],
})
class TestHost {}

describe('ContentDetailLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.nativeElement.querySelector('app-content-detail-layout')).toBeTruthy();
  });

  it('should render an article element', () => {
    const fixture = createComponent();
    const article = fixture.nativeElement.querySelector('article.content-detail-layout');
    expect(article).toBeTruthy();
  });

  it('should project header content into the header slot', () => {
    const fixture = createComponent();
    const header = fixture.nativeElement.querySelector('.content-detail-layout__header');
    expect(header.querySelector('h1')?.textContent).toBe('Test Title');
    expect(header.querySelector('p')?.textContent).toBe('Test description');
  });

  it('should project main content into the content slot', () => {
    const fixture = createComponent();
    const content = fixture.nativeElement.querySelector('.content-detail-layout__content');
    expect(content.querySelector('p')?.textContent).toBe('Main content here');
  });

  it('should have the header before the content', () => {
    const fixture = createComponent();
    const article = fixture.nativeElement.querySelector('article');
    const children = Array.from(article.children) as HTMLElement[];
    expect(children[0].classList.contains('content-detail-layout__header')).toBe(true);
    expect(children[1].classList.contains('content-detail-layout__content')).toBe(true);
  });
});
