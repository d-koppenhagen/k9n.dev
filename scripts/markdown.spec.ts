import { describe, it, expect, afterAll } from 'vitest';
import { renderMarkdown, disposeHighlighter } from './markdown';

afterAll(async () => {
  await disposeHighlighter();
});

describe('renderMarkdown', () => {
  describe('external link attributes', () => {
    it('should add rel="noopener noreferrer" and target="_blank" to external links', async () => {
      const md = '[Example](https://example.com)';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('rel="noopener noreferrer"');
      expect(result.html).toContain('target="_blank"');
      expect(result.html).toContain('href="https://example.com"');
    });

    it('should add external attributes to http:// links', async () => {
      const md = '[HTTP](http://example.org/page)';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('rel="noopener noreferrer"');
      expect(result.html).toContain('target="_blank"');
    });

    it('should NOT add external attributes to internal k9n.dev links', async () => {
      const md = '[Blog](https://k9n.dev/blog)';
      const result = await renderMarkdown(md);
      expect(result.html).not.toContain('rel="noopener noreferrer"');
      expect(result.html).not.toContain('target="_blank"');
      expect(result.html).toContain('href="https://k9n.dev/blog"');
    });

    it('should NOT add external attributes to k9n.dev subdomain links', async () => {
      const md = '[Sub](https://www.k9n.dev/page)';
      const result = await renderMarkdown(md);
      expect(result.html).not.toContain('rel="noopener noreferrer"');
      expect(result.html).not.toContain('target="_blank"');
    });

    it('should NOT add external attributes to relative links', async () => {
      const md = '[About](/about)';
      const result = await renderMarkdown(md);
      expect(result.html).not.toContain('rel="noopener noreferrer"');
      expect(result.html).not.toContain('target="_blank"');
    });

    it('should NOT add external attributes to anchor-only links', async () => {
      const md = '[Section](#section-1)';
      const result = await renderMarkdown(md);
      expect(result.html).not.toContain('rel="noopener noreferrer"');
      expect(result.html).not.toContain('target="_blank"');
    });
  });

  describe('heading ID generation', () => {
    it('should generate lowercase, hyphen-separated IDs from heading text', async () => {
      const md = '## Hello World\n\n### My Great Section';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('id="hello-world"');
      expect(result.html).toContain('id="my-great-section"');
    });

    it('should strip special characters from heading IDs', async () => {
      const md = '## Special Characters: Test! @#$%';
      const result = await renderMarkdown(md);
      // ID should be URL-safe: lowercase, hyphen-separated, no special chars
      const idMatch = result.html.match(/id="([^"]+)"/);
      expect(idMatch).not.toBeNull();
      const id = idMatch![1];
      expect(id).toBe(id.toLowerCase());
      expect(id).not.toMatch(/[^a-z0-9-]/);
    });

    it('should generate URL-safe IDs (no spaces, no uppercase)', async () => {
      const md = '## UPPERCASE Heading With MIXED Case';
      const result = await renderMarkdown(md);
      const idMatch = result.html.match(/id="([^"]+)"/);
      expect(idMatch).not.toBeNull();
      const id = idMatch![1];
      expect(id).toBe(id.toLowerCase());
      expect(id).not.toContain(' ');
      expect(id).toMatch(/^[a-z0-9-]+$/);
    });

    it('should deduplicate heading IDs with numeric suffixes', async () => {
      const md = '## Intro\n\n## Intro\n\n## Intro';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('id="intro"');
      expect(result.html).toContain('id="intro-1"');
      expect(result.html).toContain('id="intro-2"');
    });

    it('should deduplicate heading IDs across different heading levels', async () => {
      const md = '## Setup\n\n### Setup';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('id="setup"');
      expect(result.html).toContain('id="setup-1"');
    });
  });

  describe('code block syntax highlighting', () => {
    it('should syntax-highlight code blocks with a supported language', async () => {
      const md = '```typescript\nconst x = 1;\n```';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('shiki');
      expect(result.html).toContain('github-dark-dimmed');
    });

    it('should include the code content in highlighted output', async () => {
      const md = '```javascript\nfunction hello() { return 42; }\n```';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('hello');
      expect(result.html).toContain('42');
    });

    it('should render code blocks without language as plain preformatted text', async () => {
      const md = '```\nplain text here\n```';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('<pre><code>plain text here</code></pre>');
      expect(result.html).not.toContain('shiki');
    });

    it('should render unsupported languages as plain preformatted text', async () => {
      const md = '```unknownlang123\nsome code\n```';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('<pre><code');
      expect(result.html).toContain('some code');
      expect(result.html).not.toContain('shiki');
    });

    it('should escape HTML in plain preformatted code blocks', async () => {
      const md = '```\n<div class="test">&amp;</div>\n```';
      const result = await renderMarkdown(md);
      expect(result.html).toContain('&lt;div');
      expect(result.html).toContain('&amp;amp;');
    });
  });

  describe('general rendering', () => {
    it('should render basic markdown to HTML', async () => {
      const result = await renderMarkdown('## Hello\n\nA paragraph.');
      expect(result.html).toContain('<h2 id="hello">Hello</h2>');
      expect(result.html).toContain('<p>A paragraph.</p>');
    });

    it('should extract h2 and h3 headings for TOC', async () => {
      const md = '# Title\n\n## Section 1\n\n### Subsection\n\n## Section 2\n\n#### Deep';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(3);
      expect(result.headings[0]).toEqual({ id: 'section-1', text: 'Section 1', level: 2 });
      expect(result.headings[1]).toEqual({ id: 'subsection', text: 'Subsection', level: 3 });
      expect(result.headings[2]).toEqual({ id: 'section-2', text: 'Section 2', level: 2 });
    });

    it('should not include h1 or h4+ headings in TOC', async () => {
      const md = '# H1\n\n#### H4\n\n##### H5';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(0);
    });

    it('should handle empty markdown input', async () => {
      const result = await renderMarkdown('');
      expect(result.html).toBeDefined();
      expect(result.headings).toEqual([]);
    });

    it('should render unparseable segments as plain text rather than failing', async () => {
      const md = 'Some text with <unclosed tag and [broken link(';
      const result = await renderMarkdown(md);
      expect(result.html).toBeDefined();
      expect(result.html.length).toBeGreaterThan(0);
    });
  });
});
