import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Card } from './card';

const meta: Meta<Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'card'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
    hoverElevate: {
      control: 'boolean',
    },
    radius: {
      control: 'select',
      options: ['md', 'lg'],
    },
    lift: {
      control: 'boolean',
    },
    focusRing: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    variant: 'card',
    padding: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>Card heading</h2>
        <p>A plain surface card with the default border and background. Content owns its own layout.</p>
      </app-card>
    `,
  }),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>Table of contents</h2>
        <p>The elevated variant uses the raised surface background. This mirrors the table-of-contents usage.</p>
      </app-card>
    `,
  }),
};

export const HoverElevate: Story = {
  args: {
    variant: 'card',
    hoverElevate: true,
    padding: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Passive affordance for non-clickable boxes (mirrors the timeline card). On hover the card gains only a shadow — no border or background change.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>Timeline entry</h2>
        <p>Hover over this card to see the shadow lift. The border and background stay unchanged.</p>
      </app-card>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    variant: 'card',
    interactive: true,
    padding: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Wraps a focusable link (mirrors the contact social-link usage). On link hover or focus the card swaps its border to the interactive color, lifts the background and gains a hover shadow; the focus-visible outline stays on the inner link.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <a href="https://github.com/d-koppenhagen">Visit my GitHub profile</a>
      </app-card>
    `,
  }),
};

export const PaddingSmall: Story = {
  args: {
    variant: 'elevated',
    padding: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>Topic item</h2>
        <p>Compact padding, mirrors a book topic list item.</p>
      </app-card>
    `,
  }),
};

export const PaddingNone: Story = {
  args: {
    variant: 'card',
    padding: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>No padding</h2>
        <p>The card imposes no internal padding; the projected content controls its own spacing.</p>
      </app-card>
    `,
  }),
};
export const RadiusLarge: Story = {
  args: {
    variant: 'card',
    padding: 'lg',
    radius: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses `--radius-lg` for larger content cards. The default `md` keeps the historical `--radius-md` look.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <h2>Large radius</h2>
        <p>A content card with a larger border radius for a softer, more editorial feel.</p>
      </app-card>
    `,
  }),
};

export const Lift: Story = {
  args: {
    variant: 'card',
    padding: 'none',
    lift: true,
    focusRing: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Elevation/motion affordance (mirrors the content-card migration). At rest the card carries `--shadow-card`; on hover it gains `--shadow-card-hover` and translates up by 2px. Paired here with `focusRing` so the box shows a focus outline when the inner link is tabbed to. Independent of `interactive`/`hoverElevate`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <a href="https://k9n.dev">Hover to lift, tab to reveal the box focus outline</a>
      </app-card>
    `,
  }),
};

export const FocusRing: Story = {
  args: {
    variant: 'card',
    padding: 'md',
    focusRing: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility affordance. When any descendant is `:focus-visible`, the whole box shows a `--color-focus-ring` outline. Use when the focusable element lives inside the projected content. Tab to the link to see the ring on the box.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [variant]="variant" [interactive]="interactive" [hoverElevate]="hoverElevate" [padding]="padding" [radius]="radius" [lift]="lift" [focusRing]="focusRing">
        <a href="https://k9n.dev">Focus me to reveal the box outline</a>
      </app-card>
    `,
  }),
};
