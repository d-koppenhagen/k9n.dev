import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseBlogPost, parseTalk, parseProject, deriveSlug, createDuplicateTracker, isDuplicateSlug } from './frontmatter';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const TEST_DIR = join(tmpdir(), 'frontmatter-test-' + Date.now());

beforeEach(() => {
  mkdirSync(TEST_DIR, { recursive: true });
});

afterEach(() => {
  rmSync(TEST_DIR, { recursive: true, force: true });
});

function writeTestFile(filename: string, content: string): string {
  const filePath = join(TEST_DIR, filename);
  writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

describe('deriveSlug', () => {
  it('should remove .md extension from filename', () => {
    expect(deriveSlug('/path/to/2025-05-angular20.md')).toBe('2025-05-angular20');
  });

  it('should handle filenames without date prefix', () => {
    expect(deriveSlug('/path/to/angular-signals-in-depth.md')).toBe('angular-signals-in-depth');
  });

  it('should handle nested paths', () => {
    expect(deriveSlug('/a/b/c/my-post.md')).toBe('my-post');
  });
});

describe('parseBlogPost', () => {
  it('should parse a valid blog post with all fields', () => {
    const filePath = writeTestFile('2025-01-test-post.md', `---
title: "Test Post"
description: "A test description"
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
created: 2025-01-15
updated: 2025-01-20
keywords:
  - Angular
  - Testing
thumbnail:
  header: images/test-header.jpg
  card: images/test-card.jpg
series: test-series
published: true
language: en
---

## Hello World

This is the content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.slug).toBe('2025-01-test-post');
    expect(result!.title).toBe('Test Post');
    expect(result!.description).toBe('A test description');
    expect(result!.author).toEqual({ name: 'Danny Koppenhagen', mail: 'mail@k9n.dev' });
    expect(result!.created).toBe('2025-01-15');
    expect(result!.updated).toBe('2025-01-20');
    expect(result!.keywords).toEqual(['Angular', 'Testing']);
    expect(result!.thumbnail).toEqual({ header: 'https://k9n.dev/images/test-header.jpg', card: 'https://k9n.dev/images/test-card.jpg' });
    expect(result!.series).toBe('test-series');
    expect(result!.draft).toBe(false);
    expect(result!.language).toBe('en');
    expect(result!.content).toContain('## Hello World');
    expect(result!.content).toContain('This is the content.');
  });

  it('should return null for missing title', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-title.md', `---
created: 2025-01-15
---

Content here.
`);

    const result = parseBlogPost(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "title"'));
    consoleSpy.mockRestore();
  });

  it('should return null for missing created date', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-date.md', `---
title: "No Date Post"
---

Content here.
`);

    const result = parseBlogPost(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "created"'));
    consoleSpy.mockRestore();
  });

  it('should return null for malformed YAML', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('bad-yaml.md', `---
title: "Test
  invalid: yaml: [
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('malformed YAML'));
    consoleSpy.mockRestore();
  });

  it('should mark draft: true when published is false', () => {
    const filePath = writeTestFile('draft-post.md', `---
title: "Draft Post"
created: 2025-01-15
published: false
---

Draft content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.draft).toBe(true);
  });

  it('should mark draft: true when draft field is true', () => {
    const filePath = writeTestFile('draft-field.md', `---
title: "Draft Post"
created: 2025-01-15
draft: true
---

Draft content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.draft).toBe(true);
  });

  it('should use default author when not specified', () => {
    const filePath = writeTestFile('no-author.md', `---
title: "No Author Post"
created: 2025-01-15
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.author).toEqual({ name: 'Danny Koppenhagen', mail: 'mail@k9n.dev' });
  });

  it('should handle Date objects from YAML parsing', () => {
    const filePath = writeTestFile('date-object.md', `---
title: "Date Object Post"
created: 2025-01-15T00:00:00.000Z
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.created).toBe('2025-01-15');
  });

  it('should return null for non-existent file', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = parseBlogPost('/non/existent/file.md');
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('unable to read file'));
    consoleSpy.mockRestore();
  });

  it('should default to empty keywords when not provided', () => {
    const filePath = writeTestFile('no-keywords.md', `---
title: "No Keywords"
created: 2025-01-15
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.keywords).toEqual([]);
  });

  it('should normalize ISO date strings with time component', () => {
    const filePath = writeTestFile('iso-datetime.md', `---
title: "ISO DateTime Post"
created: "2025-03-20T14:30:00.000Z"
updated: "2025-04-01T09:00:00Z"
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.created).toBe('2025-03-20');
    expect(result!.updated).toBe('2025-04-01');
  });

  it('should preserve plain ISO date strings (YYYY-MM-DD)', () => {
    const filePath = writeTestFile('plain-iso.md', `---
title: "Plain ISO Post"
created: "2025-06-15"
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.created).toBe('2025-06-15');
  });

  it('should use default mail when author has name but no mail', () => {
    const filePath = writeTestFile('partial-author.md', `---
title: "Partial Author Post"
created: 2025-01-15
author:
  name: "Jane Doe"
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.author).toEqual({ name: 'Jane Doe', mail: 'mail@k9n.dev' });
  });

  it('should not mark as draft when published is true', () => {
    const filePath = writeTestFile('published-post.md', `---
title: "Published Post"
created: 2025-01-15
published: true
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.draft).toBe(false);
  });

  it('should not mark as draft when draft is false', () => {
    const filePath = writeTestFile('not-draft.md', `---
title: "Not Draft Post"
created: 2025-01-15
draft: false
---

Content.
`);

    const result = parseBlogPost(filePath);
    expect(result).not.toBeNull();
    expect(result!.draft).toBe(false);
  });
});

describe('parseTalk', () => {
  it('should parse a talk with new format (date + event)', () => {
    const filePath = writeTestFile('new-format-talk.md', `---
title: "Reactive Angular with Signals"
description: "An intro to signals"
date: 2024-06-15
event: "NG-DE Conference"
keywords:
  - Angular
  - Signals
thumbnail:
  header: images/talk-header.jpg
links:
  - url: "https://slides.example.com"
    label: "Slides"
  - url: "https://youtube.com/watch?v=abc"
    label: "Video"
draft: false
---

## Talk Abstract

Content here.
`);

    const result = parseTalk(filePath);
    expect(result).not.toBeNull();
    expect(result!.slug).toBe('new-format-talk');
    expect(result!.title).toBe('Reactive Angular with Signals');
    expect(result!.date).toBe('2024-06-15');
    expect(result!.event).toBe('NG-DE Conference');
    expect(result!.links).toEqual([
      { url: 'https://slides.example.com', label: 'Slides' },
      { url: 'https://youtube.com/watch?v=abc', label: 'Video' },
    ]);
    expect(result!.draft).toBe(false);
  });

  it('should parse a talk with legacy format (created + publishedAt)', () => {
    const filePath = writeTestFile('legacy-talk.md', `---
title: "Legacy Talk"
description: "A legacy talk"
published: true
created: 2024-01-16
publishedAt:
  name: DB Systel Tech Stories
  url: https://example.com/talk
  linkExternal: true
keywords:
  - Angular
---

Content.
`);

    const result = parseTalk(filePath);
    expect(result).not.toBeNull();
    expect(result!.date).toBe('2024-01-16');
    expect(result!.event).toBe('DB Systel Tech Stories');
    expect(result!.links).toEqual([
      { url: 'https://example.com/talk', label: 'DB Systel Tech Stories' },
    ]);
  });

  it('should return null for missing title', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-title-talk.md', `---
date: 2024-06-15
event: "Conference"
---

Content.
`);

    const result = parseTalk(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "title"'));
    consoleSpy.mockRestore();
  });

  it('should return null for missing date', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-date-talk.md', `---
title: "No Date Talk"
event: "Conference"
---

Content.
`);

    const result = parseTalk(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "date"'));
    consoleSpy.mockRestore();
  });

  it('should return null for missing event', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-event-talk.md', `---
title: "No Event Talk"
date: 2024-06-15
---

Content.
`);

    const result = parseTalk(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "event"'));
    consoleSpy.mockRestore();
  });

  it('should mark draft when published is false', () => {
    const filePath = writeTestFile('draft-talk.md', `---
title: "Draft Talk"
date: 2024-06-15
event: "Conference"
published: false
---

Content.
`);

    const result = parseTalk(filePath);
    expect(result).not.toBeNull();
    expect(result!.draft).toBe(true);
  });
});

describe('parseProject', () => {
  it('should parse a valid project with all fields', () => {
    const filePath = writeTestFile('test-project.md', `---
title: "angular-cli-ghpages"
description: "Deploy Angular apps to GitHub Pages"
created: 2023-12-29
url: "https://github.com/example/repo"
keywords:
  - Angular
  - GitHub Pages
thumbnail:
  header: images/project-header.jpg
status: active
---

## About

Project content.
`);

    const result = parseProject(filePath);
    expect(result).not.toBeNull();
    expect(result!.slug).toBe('test-project');
    expect(result!.title).toBe('angular-cli-ghpages');
    expect(result!.description).toBe('Deploy Angular apps to GitHub Pages');
    expect(result!.created).toBe('2023-12-29');
    expect(result!.url).toBe('https://github.com/example/repo');
    expect(result!.status).toBe('active');
    expect(result!.keywords).toEqual(['Angular', 'GitHub Pages']);
  });

  it('should fall back to updated date when created is missing', () => {
    const filePath = writeTestFile('updated-only.md', `---
title: "Updated Only Project"
updated: 2020-05-22
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).not.toBeNull();
    expect(result!.created).toBe('2020-05-22');
  });

  it('should return null for missing title', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-title-project.md', `---
created: 2023-12-29
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "title"'));
    consoleSpy.mockRestore();
  });

  it('should return null for missing created date', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const filePath = writeTestFile('no-date-project.md', `---
title: "No Date Project"
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('missing required field "created"'));
    consoleSpy.mockRestore();
  });

  it('should set status to draft when status is "draft"', () => {
    const filePath = writeTestFile('draft-project.md', `---
title: "Draft Project"
created: 2023-12-29
status: draft
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).not.toBeNull();
    expect(result!.status).toBe('draft');
  });

  it('should set status to draft when published is false', () => {
    const filePath = writeTestFile('unpublished-project.md', `---
title: "Unpublished Project"
created: 2023-12-29
published: false
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).not.toBeNull();
    expect(result!.status).toBe('draft');
  });

  it('should default status to active when not specified', () => {
    const filePath = writeTestFile('no-status-project.md', `---
title: "No Status Project"
created: 2023-12-29
published: true
---

Content.
`);

    const result = parseProject(filePath);
    expect(result).not.toBeNull();
    expect(result!.status).toBe('active');
  });

  it('should handle maintained and archived statuses', () => {
    const filePath1 = writeTestFile('maintained.md', `---
title: "Maintained"
created: 2023-01-01
status: maintained
---

Content.
`);
    const filePath2 = writeTestFile('archived.md', `---
title: "Archived"
created: 2023-01-01
status: archived
---

Content.
`);

    expect(parseProject(filePath1)!.status).toBe('maintained');
    expect(parseProject(filePath2)!.status).toBe('archived');
  });
});

describe('frontmatter language parsing', () => {
  describe('parseTalk language field', () => {
    it('should preserve language "en" when set in frontmatter', () => {
      const filePath = writeTestFile('talk-en.md', `---
title: "English Talk"
date: 2024-06-15
event: "NG-DE Conference"
language: en
---

Content.
`);

      const result = parseTalk(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('en');
    });

    it('should preserve language "de" when set in frontmatter', () => {
      const filePath = writeTestFile('talk-de.md', `---
title: "German Talk"
date: 2024-06-15
event: "NG-DE Conference"
language: de
---

Content.
`);

      const result = parseTalk(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
    });

    it('should default to "de" when language field is absent', () => {
      const filePath = writeTestFile('talk-no-lang.md', `---
title: "No Language Talk"
date: 2024-06-15
event: "NG-DE Conference"
---

Content.
`);

      const result = parseTalk(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
    });

    it('should default to "de" and log warning for invalid language value', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const filePath = writeTestFile('talk-invalid-lang.md', `---
title: "French Talk"
date: 2024-06-15
event: "NG-DE Conference"
language: fr
---

Content.
`);

      const result = parseTalk(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid language "fr"'));
      consoleSpy.mockRestore();
    });
  });

  describe('parseProject language field', () => {
    it('should preserve language "en" when set in frontmatter', () => {
      const filePath = writeTestFile('project-en.md', `---
title: "English Project"
created: 2023-12-29
language: en
---

Content.
`);

      const result = parseProject(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('en');
    });

    it('should preserve language "de" when set in frontmatter', () => {
      const filePath = writeTestFile('project-de.md', `---
title: "German Project"
created: 2023-12-29
language: de
---

Content.
`);

      const result = parseProject(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
    });

    it('should default to "de" when language field is absent', () => {
      const filePath = writeTestFile('project-no-lang.md', `---
title: "No Language Project"
created: 2023-12-29
---

Content.
`);

      const result = parseProject(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
    });

    it('should default to "de" and log warning for invalid language value', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const filePath = writeTestFile('project-invalid-lang.md', `---
title: "French Project"
created: 2023-12-29
language: fr
---

Content.
`);

      const result = parseProject(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid language "fr"'));
      consoleSpy.mockRestore();
    });
  });

  describe('parseBlogPost language field', () => {
    it('should preserve language "en" when set in frontmatter', () => {
      const filePath = writeTestFile('blog-en.md', `---
title: "English Post"
created: 2025-01-15
language: en
---

Content.
`);

      const result = parseBlogPost(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('en');
    });

    it('should preserve language "de" when set in frontmatter', () => {
      const filePath = writeTestFile('blog-de.md', `---
title: "German Post"
created: 2025-01-15
language: de
---

Content.
`);

      const result = parseBlogPost(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBe('de');
    });

    it('should set language to undefined when field is absent', () => {
      const filePath = writeTestFile('blog-no-lang.md', `---
title: "No Language Post"
created: 2025-01-15
---

Content.
`);

      const result = parseBlogPost(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBeUndefined();
    });

    it('should set language to undefined for invalid language value', () => {
      const filePath = writeTestFile('blog-invalid-lang.md', `---
title: "French Post"
created: 2025-01-15
language: fr
---

Content.
`);

      const result = parseBlogPost(filePath);
      expect(result).not.toBeNull();
      expect(result!.language).toBeUndefined();
    });
  });
});

describe('DuplicateTracker', () => {
  it('should return false for first occurrence of a slug', () => {
    const tracker = createDuplicateTracker();
    expect(isDuplicateSlug(tracker, 'my-post', '/path/to/my-post.md')).toBe(false);
  });

  it('should return true for duplicate slugs', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const tracker = createDuplicateTracker();
    isDuplicateSlug(tracker, 'my-post', '/path/to/my-post.md');
    expect(isDuplicateSlug(tracker, 'my-post', '/other/path/my-post.md')).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Duplicate slug "my-post"'));
    consoleSpy.mockRestore();
  });

  it('should track different slugs independently', () => {
    const tracker = createDuplicateTracker();
    expect(isDuplicateSlug(tracker, 'post-a', '/path/a.md')).toBe(false);
    expect(isDuplicateSlug(tracker, 'post-b', '/path/b.md')).toBe(false);
    expect(isDuplicateSlug(tracker, 'post-a', '/path/a-dup.md')).toBe(true);
  });
});
