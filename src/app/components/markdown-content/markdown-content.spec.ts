import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { MarkdownContent } from './markdown-content';

@Component({
  template: `<app-markdown-content [content]="content" />`,
  imports: [MarkdownContent],
})
class TestHost {
  content = '';
}

describe('MarkdownContent', () => {
  beforeEach(async () => {
    // Mock matchMedia for theme service
    Object.defineProperty(window, 'matchMedia', {
      value: () => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
        dispatchEvent: () => false,
      }),
      writable: true,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();
  });

  function createComponent(content: string) {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.content = content;
    fixture.detectChanges();
    return fixture;
  }

  describe('rendering', () => {
    it('should render HTML content via innerHTML', () => {
      const fixture = createComponent('<p>Hello World</p>');
      const content = fixture.nativeElement.querySelector('.markdown-content');
      expect(content.innerHTML).toContain('<p>Hello World</p>');
    });

    it('should render complex HTML structures', () => {
      const html = '<h2 id="intro">Intro</h2><p>Some text</p><ul><li>Item 1</li></ul>';
      const fixture = createComponent(html);
      const content = fixture.nativeElement.querySelector('.markdown-content');
      expect(content.querySelector('h2')).toBeTruthy();
      expect(content.querySelector('ul li')).toBeTruthy();
    });

    it('should render different content from different inputs', () => {
      const fixture = createComponent('<p>Updated</p>');
      const el = fixture.nativeElement.querySelector('.markdown-content');
      expect(el.textContent).toContain('Updated');
    });

    it('should render empty content when content is empty string', () => {
      const fixture = createComponent('');
      const el = fixture.nativeElement.querySelector('.markdown-content');
      expect(el.innerHTML.trim()).toBe('');
    });
  });

  describe('code blocks', () => {
    it('should render preformatted code blocks', () => {
      const htmlContent = '<pre class="shiki"><code><span>const x = 1;</span></code></pre>';
      const fixture = createComponent(htmlContent);
      const el = fixture.nativeElement.querySelector('.markdown-content');
      expect(el.querySelector('pre')).toBeTruthy();
      expect(el.querySelector('code')).toBeTruthy();
    });
  });
});
