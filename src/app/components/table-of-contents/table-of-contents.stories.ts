import type { Meta, StoryObj } from '@storybook/angular';
import { TableOfContents, type Heading } from './table-of-contents';

const sampleHeadings: Heading[] = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'installation', text: 'Installation', level: 3 },
  { id: 'configuration', text: 'Configuration', level: 3 },
  { id: 'core-concepts', text: 'Core Concepts', level: 2 },
  { id: 'components', text: 'Components', level: 3 },
  { id: 'services', text: 'Services', level: 3 },
  { id: 'advanced-usage', text: 'Advanced Usage', level: 2 },
  { id: 'performance-tips', text: 'Performance Tips', level: 3 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
];

const meta: Meta<TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TableOfContents>;

export const Default: Story = {
  args: {
    headings: sampleHeadings,
  },
};

export const FewHeadings: Story = {
  args: {
    headings: [
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'details', text: 'Details', level: 3 },
      { id: 'summary', text: 'Summary', level: 2 },
    ],
  },
};

export const Empty: Story = {
  args: {
    headings: [],
  },
};
