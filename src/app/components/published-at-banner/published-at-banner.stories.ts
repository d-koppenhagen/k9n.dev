import type { Meta, StoryObj } from '@storybook/angular';
import { PublishedAtBanner } from './published-at-banner';

const meta: Meta<PublishedAtBanner> = {
  title: 'Components/PublishedAtBanner',
  component: PublishedAtBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PublishedAtBanner>;

export const WithPublishedAt: Story = {
  args: {
    publishedAt: {
      name: 'Dev.to',
      url: 'https://dev.to/example-article',
      logo: 'https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png',
    },
  },
};

export const WithLinkedPlatforms: Story = {
  args: {
    publishedAt: {
      name: 'Medium',
      url: 'https://medium.com/@user/article',
    },
    linked: [
      { platform: 'dev.to', url: 'https://dev.to/article', label: 'Dev.to' },
      { platform: 'hashnode', url: 'https://hashnode.com/article', label: 'Hashnode' },
    ],
  },
};

export const PublishedAtOnly: Story = {
  args: {
    publishedAt: {
      name: 'Angular Blog',
      url: 'https://blog.angular.dev/article',
    },
  },
};

export const LinkedOnly: Story = {
  args: {
    linked: [
      { platform: 'twitter', url: 'https://twitter.com/thread', label: 'Twitter Thread' },
      { platform: 'linkedin', url: 'https://linkedin.com/post', label: 'LinkedIn' },
    ],
  },
};

export const Empty: Story = {
  args: {},
};
