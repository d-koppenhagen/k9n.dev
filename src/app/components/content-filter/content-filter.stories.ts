import type { Meta, StoryObj } from '@storybook/angular';
import { ContentFilter } from './content-filter';

const sampleTags = [
  'angular',
  'typescript',
  'rxjs',
  'signals',
  'testing',
  'performance',
  'accessibility',
  'ssr',
  'forms',
  'routing',
];

const meta: Meta<ContentFilter> = {
  title: 'Components/ContentFilter',
  component: ContentFilter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContentFilter>;

export const Default: Story = {
  args: {
    allTags: sampleTags,
  },
};

export const FewTags: Story = {
  args: {
    allTags: ['angular', 'typescript', 'rxjs'],
  },
};

export const NoTags: Story = {
  args: {
    allTags: [],
  },
};
