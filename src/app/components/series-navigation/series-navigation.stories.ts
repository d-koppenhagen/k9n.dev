import type { Meta, StoryObj } from '@storybook/angular';
import { SeriesNavigation, type SeriesPost } from './series-navigation';

const samplePosts: SeriesPost[] = [
  { slug: '2024-01-angular-signals-intro', title: 'Angular Signals: An Introduction', created: '2024-01-15' },
  { slug: '2024-02-angular-signals-computed', title: 'Computed Signals and Derived State', created: '2024-02-10' },
  { slug: '2024-03-angular-signals-effects', title: 'Effects and Side Effects with Signals', created: '2024-03-05' },
  { slug: '2024-04-angular-signals-migration', title: 'Migrating from RxJS to Signals', created: '2024-04-20' },
];

const meta: Meta<SeriesNavigation> = {
  title: 'Components/SeriesNavigation',
  component: SeriesNavigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SeriesNavigation>;

export const Default: Story = {
  args: {
    currentSlug: '2024-02-angular-signals-computed',
    seriesPosts: samplePosts,
  },
};

export const FirstPost: Story = {
  args: {
    currentSlug: '2024-01-angular-signals-intro',
    seriesPosts: samplePosts,
  },
};

export const LastPost: Story = {
  args: {
    currentSlug: '2024-04-angular-signals-migration',
    seriesPosts: samplePosts,
  },
};

export const SinglePost: Story = {
  args: {
    currentSlug: '2024-01-angular-signals-intro',
    seriesPosts: [samplePosts[0]],
  },
};
