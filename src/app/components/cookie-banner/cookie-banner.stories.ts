import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { CookieBanner } from './cookie-banner';

const meta: Meta<CookieBanner> = {
  title: 'Components/CookieBanner',
  component: CookieBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CookieBanner>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      onConsentGiven: fn(),
    },
    template: `<app-cookie-banner (consentGiven)="onConsentGiven($event)" />`,
  }),
};
