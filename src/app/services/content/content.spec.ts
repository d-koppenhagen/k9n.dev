import { TestBed } from '@angular/core/testing';
import { Content } from './content';

describe('Content', () => {
  let service: Content;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Content);
  });

  describe('getRecentBlogPosts', () => {
    it('should return at most N items', () => {
      const result = service.getRecentBlogPosts(2);
      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('should return all items when count exceeds total', () => {
      const total = service.blogPosts().length;
      const result = service.getRecentBlogPosts(total + 100);
      expect(result.length).toBe(total);
    });

    it('should return items sorted by date descending (newest first)', () => {
      const result = service.getRecentBlogPosts(10);
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].created).getTime();
        const currDate = new Date(result[i].created).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });

    it('should return 0 items when count is 0', () => {
      const result = service.getRecentBlogPosts(0);
      expect(result.length).toBe(0);
    });

    it('should return the first N items from the blogPosts signal', () => {
      const allPosts = service.blogPosts();
      const result = service.getRecentBlogPosts(3);
      expect(result).toEqual(allPosts.slice(0, 3));
    });
  });

  describe('getPaginatedBlogPosts', () => {
    it('should return correct items for page 1', () => {
      const result = service.getPaginatedBlogPosts(1, 3);
      const allPosts = service.blogPosts();
      expect(result.items).toEqual(allPosts.slice(0, 3));
      expect(result.currentPage).toBe(1);
    });

    it('should return correct items for page 2', () => {
      const result = service.getPaginatedBlogPosts(2, 3);
      const allPosts = service.blogPosts();
      expect(result.items).toEqual(allPosts.slice(3, 6));
      expect(result.currentPage).toBe(2);
    });

    it('should return accurate totalItems metadata', () => {
      const result = service.getPaginatedBlogPosts(1, 5);
      expect(result.totalItems).toBe(service.blogPosts().length);
    });

    it('should return accurate totalPages metadata', () => {
      const totalItems = service.blogPosts().length;
      const pageSize = 3;
      const result = service.getPaginatedBlogPosts(1, pageSize);
      expect(result.totalPages).toBe(Math.ceil(totalItems / pageSize));
    });

    it('should return at most pageSize items', () => {
      const result = service.getPaginatedBlogPosts(1, 5);
      expect(result.items.length).toBeLessThanOrEqual(5);
    });

    it('should return fewer items on the last page if not full', () => {
      const totalItems = service.blogPosts().length;
      const pageSize = 3;
      const totalPages = Math.ceil(totalItems / pageSize);
      const result = service.getPaginatedBlogPosts(totalPages, pageSize);
      const expectedLastPageItems = totalItems - (totalPages - 1) * pageSize;
      expect(result.items.length).toBe(expectedLastPageItems);
    });

    it('should return empty items for a page beyond total pages', () => {
      const totalItems = service.blogPosts().length;
      const pageSize = 5;
      const totalPages = Math.ceil(totalItems / pageSize);
      const result = service.getPaginatedBlogPosts(totalPages + 1, pageSize);
      expect(result.items.length).toBe(0);
    });

    it('should set currentPage to the requested page', () => {
      const result = service.getPaginatedBlogPosts(2, 5);
      expect(result.currentPage).toBe(2);
    });
  });

  describe('getBlogPostsBySeries', () => {
    it('should return posts belonging to the specified series', () => {
      const result = service.getBlogPostsBySeries('angular-signal-forms');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(post => {
        expect(post.series).toBe('angular-signal-forms');
      });
    });

    it('should return posts sorted by creation date ascending (oldest first)', () => {
      const result = service.getBlogPostsBySeries('angular-signal-forms');
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].created).getTime();
        const currDate = new Date(result[i].created).getTime();
        expect(prevDate).toBeLessThanOrEqual(currDate);
      }
    });

    it('should return empty array for non-existent series', () => {
      const result = service.getBlogPostsBySeries('non-existent-series');
      expect(result).toEqual([]);
    });

    it('should return posts in reverse order compared to blogPosts signal for same series', () => {
      const series = 'angular-update';
      const fromSignal = service.blogPosts().filter(p => p.series === series);
      const fromMethod = service.getBlogPostsBySeries(series);
      // The method reverses the filtered list (which is date descending) to get ascending
      expect(fromMethod).toEqual([...fromSignal].reverse());
    });
  });

  describe('getBlogPost', () => {
    it('should return the correct post for a valid slug', () => {
      const allPosts = service.blogPosts();
      if (allPosts.length > 0) {
        const expectedPost = allPosts[0];
        const result = service.getBlogPost(expectedPost.slug);
        expect(result).toEqual(expectedPost);
      }
    });

    it('should return undefined for a non-existent slug', () => {
      const result = service.getBlogPost('this-slug-does-not-exist-anywhere');
      expect(result).toBeUndefined();
    });

    it('should return undefined for an empty slug', () => {
      const result = service.getBlogPost('');
      expect(result).toBeUndefined();
    });

    it('should find a specific known blog post', () => {
      const result = service.getBlogPost('2026-05-webmcp');
      expect(result).toBeDefined();
      expect(result!.title).toBe('WebMCP: KI-Agenten in Angular-Apps integrieren');
    });
  });

  describe('getTalk', () => {
    it('should return the correct talk for a valid slug', () => {
      const allTalks = service.talks();
      if (allTalks.length > 0) {
        const expectedTalk = allTalks[0];
        const result = service.getTalk(expectedTalk.slug);
        expect(result).toEqual(expectedTalk);
      }
    });

    it('should return undefined for a non-existent slug', () => {
      const result = service.getTalk('this-talk-does-not-exist');
      expect(result).toBeUndefined();
    });

    it('should find a specific known talk', () => {
      const result = service.getTalk('2024-01-16-accessibility-in-angular');
      expect(result).toBeDefined();
      expect(result!.event).toBe('DB Systel Tech Stories');
    });
  });

  describe('getProject', () => {
    it('should return the correct project for a valid slug', () => {
      const allProjects = service.projects();
      if (allProjects.length > 0) {
        const expectedProject = allProjects[0];
        const result = service.getProject(expectedProject.slug);
        expect(result).toEqual(expectedProject);
      }
    });

    it('should return undefined for a non-existent slug', () => {
      const result = service.getProject('this-project-does-not-exist');
      expect(result).toBeUndefined();
    });

    it('should find a specific known project', () => {
      const result = service.getProject('2019-11-20-angular-tag-cloud-module');
      expect(result).toBeDefined();
      expect(result!.title).toBe('angular-tag-cloud-module — Generated word clouds for your Angular app');
    });
  });

  describe('signal-based content access', () => {
    it('should expose blogPosts as a signal with array content', () => {
      const posts = service.blogPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should expose talks as a signal with array content', () => {
      const talks = service.talks();
      expect(Array.isArray(talks)).toBe(true);
    });

    it('should expose projects as a signal with array content', () => {
      const projects = service.projects();
      expect(Array.isArray(projects)).toBe(true);
    });
  });
});
