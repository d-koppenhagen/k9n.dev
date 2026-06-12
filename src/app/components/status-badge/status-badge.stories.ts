import type { Meta, StoryObj } from '@storybook/angular';
import { StatusBadge } from './status-badge';

const meta: Meta<StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'maintained', 'archived', 'draft'],
    },
  },
};

export default meta;
type Story = StoryObj<StatusBadge>;

export const Active: Story = {
  args: { status: 'active' },
};

export const Maintained: Story = {
  args: { status: 'maintained' },
};

export const Archived: Story = {
  args: { status: 'archived' },
};

export const Draft: Story = {
  args: { status: 'draft' },
};
