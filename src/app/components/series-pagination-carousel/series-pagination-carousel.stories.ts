import type { Meta, StoryObj } from '@storybook/angular';
import { SeriesPaginationCarousel } from './series-pagination-carousel';

const meta: Meta<SeriesPaginationCarousel> = {
  title: 'Components/SeriesPaginationCarousel',
  component: SeriesPaginationCarousel,
  tags: ['autodocs'],
  argTypes: {
    itemCount: { control: { type: 'number', min: 1, max: 10 } },
    selectedIndex: { control: { type: 'number', min: 0, max: 9 } },
    maxVisibleTabs: { control: { type: 'number', min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<SeriesPaginationCarousel>;

export const Default: Story = {
  args: {
    itemCount: 4,
    selectedIndex: 1,
    maxVisibleTabs: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-series-pagination-carousel
        [itemCount]="itemCount"
        [(selectedIndex)]="selectedIndex"
        [maxVisibleTabs]="maxVisibleTabs"
      >
        <div style="padding: 2rem; background: var(--color-background-secondary, #f3f3f3); text-align: center;">
          <h3>Slide 1</h3>
          <p>Angular Signals: An Introduction</p>
        </div>
        <div style="padding: 2rem; background: var(--color-surface-elevated, #e8e8e8); text-align: center;">
          <h3>Slide 2 (active)</h3>
          <p>Computed Signals and Derived State</p>
        </div>
        <div style="padding: 2rem; background: var(--color-background-secondary, #f3f3f3); text-align: center;">
          <h3>Slide 3</h3>
          <p>Effects and Side Effects with Signals</p>
        </div>
        <div style="padding: 2rem; background: var(--color-surface-elevated, #e8e8e8); text-align: center;">
          <h3>Slide 4</h3>
          <p>Migrating from RxJS to Signals</p>
        </div>
      </app-series-pagination-carousel>
    `,
  }),
};

export const ManySlides: Story = {
  args: {
    itemCount: 8,
    selectedIndex: 3,
    maxVisibleTabs: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-series-pagination-carousel
        [itemCount]="itemCount"
        [(selectedIndex)]="selectedIndex"
        [maxVisibleTabs]="maxVisibleTabs"
      >
        @for (i of [1,2,3,4,5,6,7,8]; track i) {
          <div style="padding: 2rem; background: var(--color-background-secondary, #f3f3f3); text-align: center;">
            <h3>Slide {{ i }}</h3>
            <p>Content for slide number {{ i }}</p>
          </div>
        }
      </app-series-pagination-carousel>
    `,
  }),
};

export const LastSlideSelected: Story = {
  args: {
    itemCount: 4,
    selectedIndex: 3,
    maxVisibleTabs: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-series-pagination-carousel
        [itemCount]="itemCount"
        [(selectedIndex)]="selectedIndex"
        [maxVisibleTabs]="maxVisibleTabs"
      >
        <div style="padding: 2rem; background: var(--color-background-secondary, #f3f3f3); text-align: center;">
          <h3>Slide 1</h3>
          <p>First article</p>
        </div>
        <div style="padding: 2rem; background: var(--color-surface-elevated, #e8e8e8); text-align: center;">
          <h3>Slide 2</h3>
          <p>Second article</p>
        </div>
        <div style="padding: 2rem; background: var(--color-background-secondary, #f3f3f3); text-align: center;">
          <h3>Slide 3</h3>
          <p>Third article</p>
        </div>
        <div style="padding: 2rem; background: var(--color-surface-elevated, #e8e8e8); text-align: center;">
          <h3>Slide 4 (selected)</h3>
          <p>Last slide is currently selected</p>
        </div>
      </app-series-pagination-carousel>
    `,
  }),
};
