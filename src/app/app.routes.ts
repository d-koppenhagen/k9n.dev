import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page';
import { NotFoundPage } from './pages/not-found/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog-list-page').then(
        (m) => m.BlogListPage,
      ),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog/blog-detail-page').then(
        (m) => m.BlogDetailPage,
      ),
  },
  {
    path: 'talks',
    loadComponent: () =>
      import('./pages/talks/talks-list-page').then(
        (m) => m.TalksListPage,
      ),
  },
  {
    path: 'talks/:slug',
    loadComponent: () =>
      import('./pages/talks/talk-detail-page').then(
        (m) => m.TalkDetailPage,
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects-list-page').then(
        (m) => m.ProjectsListPage,
      ),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/projects/project-detail-page').then(
        (m) => m.ProjectDetailPage,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page').then(
        (m) => m.AboutPage,
      ),
  },
  {
    path: 'book',
    loadComponent: () =>
      import('./pages/book/book-page').then(
        (m) => m.BookPage,
      ),
  },
  {
    path: 'hiring',
    loadComponent: () =>
      import('./pages/hiring/hiring-page').then(
        (m) => m.HiringPage,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page').then(
        (m) => m.ContactPage,
      ),
  },
  {
    path: 'imprint',
    loadComponent: () =>
      import('./pages/imprint/imprint-page').then(
        (m) => m.ImprintPage,
      ),
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
