import { describe, it, expect, afterAll } from 'vitest';
import { renderMarkdown, disposeHighlighter } from './markdown';

afterAll(async () => {
  await disposeHighlighter();
});

describe('TOC heading extraction', () => {
  describe('h2 and h3 headings are extracted in document order', () => {
    it('should extract h2 headings in the order they appear', async () => {
      const md = '## First\n\n## Second\n\n## Third';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(3);
      expect(result.headings[0].text).toBe('First');
      expect(result.headings[1].text).toBe('Second');
      expect(result.headings[2].text).toBe('Third');
    });

    it('should extract h3 headings in the order they appear', async () => {
      const md = '### Alpha\n\n### Beta\n\n### Gamma';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(3);
      expect(result.headings[0].text).toBe('Alpha');
      expect(result.headings[1].text).toBe('Beta');
      expect(result.headings[2].text).toBe('Gamma');
    });

    it('should preserve document order when mixing h2 and h3', async () => {
      const md = '## Introduction\n\n### Background\n\n## Methods\n\n### Data Collection\n\n### Analysis\n\n## Results';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(6);
      expect(result.headings.map((h) => h.text)).toEqual([
        'Introduction',
        'Background',
        'Methods',
        'Data Collection',
        'Analysis',
        'Results',
      ]);
    });

    it('should assign correct level values to h2 and h3', async () => {
      const md = '## Section\n\n### Subsection\n\n## Another Section';
      const result = await renderMarkdown(md);
      expect(result.headings[0].level).toBe(2);
      expect(result.headings[1].level).toBe(3);
      expect(result.headings[2].level).toBe(2);
    });

    it('should handle multiple h3 under a single h2', async () => {
      const md = '## Parent\n\n### Child 1\n\n### Child 2\n\n### Child 3';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(4);
      expect(result.headings[0]).toEqual({ id: 'parent', text: 'Parent', level: 2 });
      expect(result.headings[1]).toEqual({ id: 'child-1', text: 'Child 1', level: 3 });
      expect(result.headings[2]).toEqual({ id: 'child-2', text: 'Child 2', level: 3 });
      expect(result.headings[3]).toEqual({ id: 'child-3', text: 'Child 3', level: 3 });
    });
  });

  describe('h1, h4+ headings are excluded', () => {
    it('should exclude h1 headings', async () => {
      const md = '# Title\n\n## Included Section';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(1);
      expect(result.headings[0].text).toBe('Included Section');
    });

    it('should exclude h4 headings', async () => {
      const md = '## Included\n\n#### Not Included';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(1);
      expect(result.headings[0].text).toBe('Included');
    });

    it('should exclude h5 headings', async () => {
      const md = '## Included\n\n##### Deep Heading';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(1);
      expect(result.headings[0].text).toBe('Included');
    });

    it('should exclude h6 headings', async () => {
      const md = '## Included\n\n###### Very Deep Heading';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(1);
      expect(result.headings[0].text).toBe('Included');
    });

    it('should return empty array when only h1 and h4+ headings exist', async () => {
      const md = '# Title\n\n#### Sub Detail\n\n##### Deep\n\n###### Deepest';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(0);
    });

    it('should extract only h2/h3 from a document with all heading levels', async () => {
      const md = '# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6';
      const result = await renderMarkdown(md);
      expect(result.headings).toHaveLength(2);
      expect(result.headings[0]).toEqual({ id: 'h2', text: 'H2', level: 2 });
      expect(result.headings[1]).toEqual({ id: 'h3', text: 'H3', level: 3 });
    });
  });

  describe('extracted headings have valid id and text', () => {
    it('should generate lowercase hyphen-separated IDs', async () => {
      const md = '## Hello World';
      const result = await renderMarkdown(md);
      expect(result.headings[0].id).toBe('hello-world');
    });

    it('should strip special characters from IDs', async () => {
      const md = '## Special Characters: Test!';
      const result = await renderMarkdown(md);
      expect(result.headings[0].id).toMatch(/^[a-z0-9-]+$/);
      expect(result.headings[0].text).toBe('Special Characters: Test!');
    });

    it('should generate unique IDs for duplicate heading texts', async () => {
      const md = '## Setup\n\n## Setup\n\n## Setup';
      const result = await renderMarkdown(md);
      const ids = result.headings.map((h) => h.id);
      expect(ids[0]).toBe('setup');
      expect(ids[1]).toBe('setup-1');
      expect(ids[2]).toBe('setup-2');
      // All IDs are unique
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should preserve the original text content in the text field', async () => {
      const md = '## Getting Started with Angular 22';
      const result = await renderMarkdown(md);
      expect(result.headings[0].text).toBe('Getting Started with Angular 22');
    });

    it('should handle headings with numbers', async () => {
      const md = '## Step 1\n\n## Step 2';
      const result = await renderMarkdown(md);
      expect(result.headings[0].id).toBe('step-1');
      expect(result.headings[1].id).toBe('step-2');
      expect(result.headings[0].text).toBe('Step 1');
      expect(result.headings[1].text).toBe('Step 2');
    });

    it('should produce URL-safe IDs (no spaces or special chars)', async () => {
      const md = '## Über Uns & More (Details)\n\n### FAQ: Common Questions?';
      const result = await renderMarkdown(md);
      for (const heading of result.headings) {
        expect(heading.id).not.toContain(' ');
        expect(heading.id).toMatch(/^[a-z0-9ü-]+$/);
      }
    });

    it('should have non-empty id and text for every extracted heading', async () => {
      const md = '## Introduction\n\n### Overview\n\n## Conclusion';
      const result = await renderMarkdown(md);
      for (const heading of result.headings) {
        expect(heading.id.length).toBeGreaterThan(0);
        expect(heading.text.length).toBeGreaterThan(0);
      }
    });
  });

  describe('empty markdown produces empty headings array', () => {
    it('should return empty headings for empty string', async () => {
      const result = await renderMarkdown('');
      expect(result.headings).toEqual([]);
    });

    it('should return empty headings for whitespace-only input', async () => {
      const result = await renderMarkdown('   \n\n   ');
      expect(result.headings).toEqual([]);
    });

    it('should return empty headings for markdown with no headings', async () => {
      const md = 'Just a paragraph.\n\nAnother paragraph with **bold** and *italic*.';
      const result = await renderMarkdown(md);
      expect(result.headings).toEqual([]);
    });

    it('should return empty headings when only non-h2/h3 headings exist', async () => {
      const md = '# Only a title\n\nSome content.\n\n#### Deep heading';
      const result = await renderMarkdown(md);
      expect(result.headings).toEqual([]);
    });
  });
});
