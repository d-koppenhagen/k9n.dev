import type { Meta, StoryObj } from '@storybook/angular';
import { ArticleDetailLayout } from './article-detail-layout';

const meta: Meta<ArticleDetailLayout> = {
  title: 'Layouts/ArticleDetailLayout',
  component: ArticleDetailLayout,
  tags: ['autodocs'],
  argTypes: {
    showSidebar: {
      control: 'boolean',
      description: 'Whether to show the sidebar column',
    },
  },
};

export default meta;
type Story = StoryObj<ArticleDetailLayout>;

export const WithSidebar: Story = {
  args: {
    showSidebar: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-article-detail-layout [showSidebar]="showSidebar">
        <img slot="hero" src="https://picsum.photos/1200/600" alt="Hero image" style="width: 100%; height: auto; aspect-ratio: 2 / 1; object-fit: cover; display: block;" />
        <div slot="header">
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
            <time style="font-size: 0.875rem; color: var(--color-text-muted);">Nov 15, 2025</time>
          </div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(2rem, 1.5rem + 2.5vw, 3.25rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1.5rem;">Understanding ARIA Live Regions</h1>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary); display: flex; gap: 0.5rem; justify-content: center;">
            <span style="color: var(--color-text-muted);">Von</span>
            <span style="font-weight: 600;">Danny Koppenhagen</span>
          </div>
        </div>
        <div slot="content">
          <p style="line-height: 1.7; margin-bottom: 1.5rem;">This is the main article content. It would typically contain rendered markdown with headings, code blocks, images, and other rich content.</p>
          <p style="line-height: 1.7; margin-bottom: 1.5rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <h2 style="font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem;">What are Live Regions?</h2>
          <p style="line-height: 1.7;">ARIA live regions provide a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.</p>
        </div>
        <div slot="sidebar">
          <nav style="background: var(--color-background-secondary, #f8f7fc); padding: 1.5rem; border-radius: 0.75rem;">
            <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem;">Table of Contents</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><a href="#" style="color: var(--color-text-secondary); text-decoration: none;">What are Live Regions?</a></li>
              <li><a href="#" style="color: var(--color-text-secondary); text-decoration: none;">When to use them</a></li>
              <li><a href="#" style="color: var(--color-text-secondary); text-decoration: none;">Best Practices</a></li>
            </ul>
          </nav>
        </div>
      </app-article-detail-layout>
    `,
  }),
};

export const WithoutSidebar: Story = {
  args: {
    showSidebar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-article-detail-layout [showSidebar]="showSidebar">
        <img slot="hero" src="https://picsum.photos/1200/600" alt="Hero image" style="width: 100%; height: auto; aspect-ratio: 2 / 1; object-fit: cover; display: block;" />
        <div slot="header">
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
            <time style="font-size: 0.875rem; color: var(--color-text-muted);">Nov 15, 2025</time>
          </div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(2rem, 1.5rem + 2.5vw, 3.25rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1.5rem;">Article Without Sidebar</h1>
        </div>
        <div slot="content">
          <p style="line-height: 1.7; margin-bottom: 1.5rem;">This article layout has no sidebar. The content takes the full width of the body area.</p>
          <p style="line-height: 1.7;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </app-article-detail-layout>
    `,
  }),
};

export const WithoutHero: Story = {
  args: {
    showSidebar: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-article-detail-layout [showSidebar]="showSidebar">
        <div slot="header">
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
            <time style="font-size: 0.875rem; color: var(--color-text-muted);">Nov 15, 2025</time>
          </div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(2rem, 1.5rem + 2.5vw, 3.25rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1.5rem;">Article Without Hero Image</h1>
        </div>
        <div slot="content">
          <p style="line-height: 1.7; margin-bottom: 1.5rem;">No hero image is projected — the hero slot is empty and hidden automatically via CSS.</p>
        </div>
        <div slot="sidebar">
          <nav style="background: var(--color-background-secondary, #f8f7fc); padding: 1.5rem; border-radius: 0.75rem;">
            <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem;">Sidebar</h3>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary);">Sidebar content here</p>
          </nav>
        </div>
      </app-article-detail-layout>
    `,
  }),
};
