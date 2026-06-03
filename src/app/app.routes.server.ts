import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './content/blog-posts.generated';
import { TALKS } from './content/talks.generated';
import { PROJECTS } from './content/projects.generated';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOG_POSTS
        .filter(post => !post.publishedAt)
        .map(post => ({ slug: post.slug }));
    },
  },
  {
    path: 'talks/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return TALKS.map(talk => ({ slug: talk.slug }));
    },
  },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PROJECTS.map(project => ({ slug: project.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
