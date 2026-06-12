import type { Meta, StoryObj } from '@storybook/angular';
import { LanguageSwitcher } from './language-switcher';

const meta: Meta<LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LanguageSwitcher>;

export const Default: Story = {};
