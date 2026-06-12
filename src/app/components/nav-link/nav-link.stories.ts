import type { Meta, StoryObj } from '@storybook/angular';
import { NavLink } from './nav-link';

const meta: Meta<NavLink> = {
  title: 'Components/NavLink',
  component: NavLink,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NavLink>;

export const Default: Story = {
  args: {
    link: '/blog',
  },
  render: (args) => ({
    props: args,
    template: `<app-nav-link [link]="link">Blog</app-nav-link>`,
  }),
};

export const HomepageLink: Story = {
  args: {
    link: '/',
  },
  render: (args) => ({
    props: args,
    template: `<app-nav-link [link]="link">Home</app-nav-link>`,
  }),
};
