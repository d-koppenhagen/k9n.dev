import type { Meta, StoryObj } from '@storybook/angular';
import { Footer } from './footer';

const meta: Meta<Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Footer>;

export const Default: Story = {};
