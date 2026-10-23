import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Card } from './card';

@Component({
  template: `<app-card
    [variant]="variant"
    [interactive]="interactive"
    [hoverElevate]="hoverElevate"
    [padding]="padding"
    [radius]="radius"
    [lift]="lift"
    [focusRing]="focusRing"
  ><p class="projected">content</p></app-card>`,
  imports: [Card],
})
class TestHost {
  variant: 'elevated' | 'card' = 'card';
  interactive = false;
  hoverElevate = false;
  padding: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  radius: 'md' | 'lg' = 'md';
  lift = false;
  focusRing = false;
}

describe('Card', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
  });

  function createComponent(overrides: Partial<TestHost> = {}) {
    const fixture = TestBed.createComponent(TestHost);
    Object.assign(fixture.componentInstance, overrides);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('app-card') as HTMLElement;
    return { fixture, host };
  }

  describe('content projection', () => {
    it('should project default slot content', () => {
      const { fixture } = createComponent();
      const projected = fixture.nativeElement.querySelector('.projected');
      expect(projected).toBeTruthy();
      expect(projected.textContent).toBe('content');
    });
  });

  describe('defaults', () => {
    it('should default to the card variant and lg padding', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--card')).toBe(true);
      expect(host.classList.contains('card--pad-lg')).toBe(true);
    });
  });

  describe('variant classes', () => {
    it('should apply card--elevated for the elevated variant', () => {
      const { host } = createComponent({ variant: 'elevated' });
      expect(host.classList.contains('card--elevated')).toBe(true);
      expect(host.classList.contains('card--card')).toBe(false);
    });

    it('should apply card--card for the card variant', () => {
      const { host } = createComponent({ variant: 'card' });
      expect(host.classList.contains('card--card')).toBe(true);
      expect(host.classList.contains('card--elevated')).toBe(false);
    });
  });

  describe('padding classes', () => {
    const cases: ['none' | 'sm' | 'md' | 'lg', string][] = [
      ['none', 'card--pad-none'],
      ['sm', 'card--pad-sm'],
      ['md', 'card--pad-md'],
      ['lg', 'card--pad-lg'],
    ];

    for (const [padding, expectedClass] of cases) {
      it(`should apply ${expectedClass} for padding="${padding}"`, () => {
        const { host } = createComponent({ padding });
        expect(host.classList.contains(expectedClass)).toBe(true);
      });
    }
  });

  describe('interactive', () => {
    it('should not apply card--interactive by default', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--interactive')).toBe(false);
    });

    it('should apply card--interactive when enabled', () => {
      const { host } = createComponent({ interactive: true });
      expect(host.classList.contains('card--interactive')).toBe(true);
    });
  });

  describe('hoverElevate', () => {
    it('should not apply card--hover-elevate by default', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--hover-elevate')).toBe(false);
    });

    it('should apply card--hover-elevate when enabled', () => {
      const { host } = createComponent({ hoverElevate: true });
      expect(host.classList.contains('card--hover-elevate')).toBe(true);
    });
  });

  describe('radius classes', () => {
    it('should apply card--radius-md by default', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--radius-md')).toBe(true);
      expect(host.classList.contains('card--radius-lg')).toBe(false);
    });

    it('should apply card--radius-lg for radius="lg"', () => {
      const { host } = createComponent({ radius: 'lg' });
      expect(host.classList.contains('card--radius-lg')).toBe(true);
      expect(host.classList.contains('card--radius-md')).toBe(false);
    });
  });

  describe('lift', () => {
    it('should not apply card--lift by default', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--lift')).toBe(false);
    });

    it('should apply card--lift when enabled', () => {
      const { host } = createComponent({ lift: true });
      expect(host.classList.contains('card--lift')).toBe(true);
    });
  });

  describe('focusRing', () => {
    it('should not apply card--focus-ring by default', () => {
      const { host } = createComponent();
      expect(host.classList.contains('card--focus-ring')).toBe(false);
    });

    it('should apply card--focus-ring when enabled', () => {
      const { host } = createComponent({ focusRing: true });
      expect(host.classList.contains('card--focus-ring')).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should NOT set a role on the host element', () => {
      const { host } = createComponent();
      expect(host.hasAttribute('role')).toBe(false);
    });
  });
});
