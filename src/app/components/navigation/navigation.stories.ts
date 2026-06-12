import type { Meta, StoryObj } from '@storybook/angular';
import { Navigation } from './navigation';

const meta: Meta<Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Navigation>;

export const Default: Story = {};
