import type { Meta, StoryObj } from '@storybook/angular';
import { PersonalTimeline } from './personal-timeline';

const meta: Meta<PersonalTimeline> = {
  title: 'Components/PersonalTimeline',
  component: PersonalTimeline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PersonalTimeline>;

export const Default: Story = {};
