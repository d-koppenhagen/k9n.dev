import type { Meta, StoryObj } from '@storybook/angular';
import { ContentGrid } from './content-grid';

const meta: Meta<ContentGrid> = {
  title: 'Layouts/ContentGrid',
  component: ContentGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContentGrid>;

export const Default: Story = {
  render: () => ({
    template: `
      <app-content-grid>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 1 (featured)</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 2</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 3</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 4</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 5</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 6</div>
      </app-content-grid>
    `,
  }),
};

export const FewItems: Story = {
  render: () => ({
    template: `
      <app-content-grid>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 1 (featured)</div>
        <div style="background: var(--color-background-secondary, #f3f3f3); padding: 2rem; border-radius: 0.75rem; text-align: center;">Card 2</div>
      </app-content-grid>
    `,
  }),
};
