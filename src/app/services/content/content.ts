import { Service, signal } from '@angular/core';
import type {
  BlogPost,
  Talk,
  Project,
  PaginatedResult,
} from '../../models/content.model';
import { BLOG_POSTS } from '../../content/blog-posts.generated';
import { TALKS } from '../../content/talks.generated';
import { PROJECTS } from '../../content/projects.generated';

@Service()
export class Content {
  readonly blogPosts = signal<BlogPost[]>(BLOG_POSTS);
  readonly talks = signal<Talk[]>(TALKS);
  readonly projects = signal<Project[]>(PROJECTS);

  getBlogPost(slug: string): BlogPost | undefined {
    return this.blogPosts().find((post) => post.slug === slug);
  }

  getTalk(slug: string): Talk | undefined {
    return this.talks().find((talk) => talk.slug === slug);
  }

  getProject(slug: string): Project | undefined {
    return this.projects().find((project) => project.slug === slug);
  }

  getRecentBlogPosts(count: number): BlogPost[] {
    return this.blogPosts().slice(0, count);
  }

  getRecentTalks(count: number): Talk[] {
    return this.talks().slice(0, count);
  }

  getRecentProjects(count: number): Project[] {
    return this.projects().slice(0, count);
  }

  getBlogPostsBySeries(series: string): BlogPost[] {
    return this.blogPosts()
      .filter((post) => post.series === series)
      .slice()
      .reverse();
  }

  getPaginatedBlogPosts(page: number, pageSize: number): PaginatedResult<BlogPost> {
    const allPosts = this.blogPosts();
    const totalItems = allPosts.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize;
    const items = allPosts.slice(start, start + pageSize);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }
}
