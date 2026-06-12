import type { Meta, StoryObj } from '@storybook/angular';
import { ContentListLayout } from './content-list-layout';

const meta: Meta<ContentListLayout> = {
  title: 'Layouts/ContentListLayout',
  component: ContentListLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContentListLayout>;

export const Default: Story = {
  args: {
    title: 'Blog',
    subtitle: 'Thoughts on Angular, TypeScript, and modern web development.',
    allTags: ['angular', 'typescript', 'signals', 'testing', 'performance'],
  },
  render: (args) => ({
    props: args,
    template: `
      <app-content-list-layout [title]="title" [subtitle]="subtitle" [allTags]="allTags">
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 1</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 2</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 3</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 4</div>
      </app-content-list-layout>
    `,
  }),
};

export const WithCustomGridLabel: Story = {
  args: {
    title: 'Talks',
    subtitle: 'Conference talks and presentations.',
    allTags: ['angular', 'rxjs'],
    gridAriaLabel: 'List of talks',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-content-list-layout [title]="title" [subtitle]="subtitle" [allTags]="allTags" [gridAriaLabel]="gridAriaLabel">
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Talk 1</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Talk 2</div>
      </app-content-list-layout>
    `,
  }),
};
