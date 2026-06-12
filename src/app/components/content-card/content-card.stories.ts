import type { Meta, StoryObj } from '@storybook/angular';
import { ContentCard, type SeriesItem } from './content-card';

const seriesItems: SeriesItem[] = [
  {
    title: 'Angular Signals: An Introduction',
    routeLink: '/blog/2024-01-angular-signals-intro',
    date: '2024-01-15',
    description: 'Getting started with signals in Angular',
    thumbnail: { header: 'images/bg1.jpg' },
  },
  {
    title: 'Computed Signals and Derived State',
    routeLink: '/blog/2024-02-angular-signals-computed',
    date: '2024-02-10',
    description: 'Learn about computed signals for derived state',
    thumbnail: { header: 'images/bg1.jpg' },
  },
  {
    title: 'Effects and Side Effects with Signals',
    routeLink: '/blog/2024-03-angular-signals-effects',
    date: '2024-03-05',
    description: 'Managing side effects with the effect() API',
    thumbnail: { header: 'images/bg1.jpg' },
  },
];

const meta: Meta<ContentCard> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
  argTypes: {
    headingLevel: {
      control: 'select',
      options: [2, 3],
    },
    status: {
      control: 'select',
      options: [undefined, 'active', 'maintained', 'archived', 'draft'],
    },
  },
};

export default meta;
type Story = StoryObj<ContentCard>;

export const Default: Story = {
  args: {
    title: 'Angular Signals: A Comprehensive Guide',
    description: 'Learn everything about Angular Signals, from basics to advanced patterns for reactive state management.',
    date: '2024-06-15',
    routeLink: '/blog/angular-signals-guide',
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const WithExternalLink: Story = {
  args: {
    title: 'Published on Dev.to',
    description: 'This article was originally published on an external platform.',
    date: '2024-05-20',
    routeLink: '/blog/external-article',
    externalUrl: 'https://dev.to/example',
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const WithStatus: Story = {
  args: {
    title: 'My Open Source Project',
    description: 'A project with an active maintenance status.',
    date: '2024-03-01',
    routeLink: '/projects/my-project',
    status: 'active',
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const WithPublishedAt: Story = {
  args: {
    title: 'Cross-posted Article',
    description: 'Originally published on Medium.',
    date: '2024-04-10',
    routeLink: '/blog/cross-posted',
    publishedAt: { name: 'Medium', url: 'https://medium.com/@user/article' },
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const WithSeries: Story = {
  args: {
    title: 'Computed Signals and Derived State',
    description: 'Learn about computed signals for derived state management in Angular.',
    date: '2024-02-10',
    routeLink: '/blog/2024-02-angular-signals-computed',
    seriesName: 'Angular Signals',
    seriesItems,
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const UpcomingEvent: Story = {
  args: {
    title: 'Angular Conference 2026',
    description: 'An upcoming talk at Angular Conference.',
    date: '2026-12-01',
    routeLink: '/talks/angular-conf-2026',
    eventName: 'NG-DE',
    thumbnail: { header: 'images/bg1.jpg' },
  },
};

export const HeadingLevel2: Story = {
  args: {
    title: 'Featured Post with H2 Heading',
    description: 'This card uses an h2 heading level, suitable for hero/featured positions.',
    date: '2024-07-01',
    routeLink: '/blog/featured',
    headingLevel: 2,
    priority: true,
    thumbnail: { header: 'images/bg1.jpg' },
  },
};
