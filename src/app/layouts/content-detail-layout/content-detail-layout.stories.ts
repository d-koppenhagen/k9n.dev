import type { Meta, StoryObj } from '@storybook/angular';
import { ContentDetailLayout } from './content-detail-layout';

const meta: Meta<ContentDetailLayout> = {
  title: 'Layouts/ContentDetailLayout',
  component: ContentDetailLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContentDetailLayout>;

export const Default: Story = {
  render: () => ({
    template: `
      <app-content-detail-layout>
        <div slot="header">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem; color: var(--color-text-muted);">
            <span style="font-weight: 600; color: var(--color-accent);">NgConf 2025</span>
            <span>·</span>
            <time>Sep 30, 2025</time>
          </div>
          <h1 style="font-size: clamp(2rem, 1.5rem + 2.5vw, 3.25rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 1rem;">Mind the A11y Gap</h1>
          <p style="font-size: 1.125rem; color: var(--color-text-secondary); line-height: 1.6;">A deep dive into accessibility patterns for modern Angular applications.</p>
        </div>
        <div slot="content">
          <p style="line-height: 1.7;">This is the main content area where markdown-rendered content, published-at banners, and resource links would appear.</p>
          <p style="line-height: 1.7; margin-top: 1.5rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </app-content-detail-layout>
    `,
  }),
};

export const WithLinks: Story = {
  render: () => ({
    template: `
      <app-content-detail-layout>
        <div slot="header">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="display: inline-flex; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.375rem; background: #e8f5e9; color: #2e7d32;">Active</span>
            <time style="font-size: 0.875rem; color: var(--color-text-muted);">Mar 12, 2020</time>
          </div>
          <h1 style="font-size: clamp(2rem, 1.5rem + 2.5vw, 3.25rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 1rem;">Dotfiles</h1>
          <p style="font-size: 1.125rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">My personal dotfiles for macOS development setup.</p>
          <a href="#" style="display: inline-flex; align-items: center; gap: 0.25rem; font-weight: 600; color: var(--color-accent); text-decoration: none; padding: 0.5rem 1rem; border: 1px solid var(--color-accent); border-radius: 0.75rem;">Projekt ansehen ↗</a>
        </div>
        <div slot="content">
          <p style="line-height: 1.7;">Project content with setup instructions and configuration details.</p>
        </div>
      </app-content-detail-layout>
    `,
  }),
};
