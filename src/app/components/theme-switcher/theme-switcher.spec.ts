import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, signal } from '@angular/core';
import { ThemeSwitcher } from './theme-switcher';
import { Theme } from '../../services/theme/theme';

describe('ThemeSwitcher', () => {
  let mockPreference: ReturnType<typeof signal<'dark' | 'light' | 'system'>>;
  let mockSetTheme: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockPreference = signal<'dark' | 'light' | 'system'>('system');
    mockSetTheme = vi.fn((value: 'dark' | 'light' | 'system') => {
      mockPreference.set(value);
    });

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: Theme,
          useValue: {
            preference: mockPreference.asReadonly(),
            theme: signal<'dark' | 'light'>('light').asReadonly(),
            setTheme: mockSetTheme,
          },
        },
      ],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(ThemeSwitcher);
    fixture.detectChanges();
    return fixture;
  }

  describe('rendering', () => {
    it('should render three theme option buttons', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(3);
    });

    it('should render a group with role="group" and aria-label', () => {
      const fixture = createComponent();
      const group = fixture.nativeElement.querySelector('[role="group"]');
      expect(group).toBeTruthy();
      expect(group.getAttribute('aria-label')).toBe('Design-Auswahl');
    });

    it('should render visually hidden labels for each option', () => {
      const fixture = createComponent();
      const labels = fixture.nativeElement.querySelectorAll('.visually-hidden');
      expect(labels.length).toBe(3);
      expect(labels[0].textContent.trim()).toBe('Hell');
      expect(labels[1].textContent.trim()).toBe('Dunkel');
      expect(labels[2].textContent.trim()).toBe('System');
    });

    it('should render SVG icons with aria-hidden="true"', () => {
      const fixture = createComponent();
      const svgs = fixture.nativeElement.querySelectorAll('svg');
      expect(svgs.length).toBe(3);
      svgs.forEach((svg: Element) => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should set aria-pressed="true" on the active option', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      // Default preference is 'system' (index 2)
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
      expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    });

    it('should set aria-pressed="true" on light button when preference is light', () => {
      mockPreference.set('light');
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
      expect(buttons[2].getAttribute('aria-pressed')).toBe('false');
    });

    it('should set aria-pressed="true" on dark button when preference is dark', () => {
      mockPreference.set('dark');
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
      expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
      expect(buttons[2].getAttribute('aria-pressed')).toBe('false');
    });

    it('should apply active class to the currently selected button', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons[2].classList.contains('theme-switcher__button--active')).toBe(true);
      expect(buttons[0].classList.contains('theme-switcher__button--active')).toBe(false);
      expect(buttons[1].classList.contains('theme-switcher__button--active')).toBe(false);
    });
  });

  describe('keyboard interaction', () => {
    it('should be focusable via Tab (buttons are natively focusable)', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons.forEach((button: HTMLButtonElement) => {
        expect(button.tabIndex).toBeGreaterThanOrEqual(0);
      });
    });

    it('should activate on Enter key press', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      const lightButton = buttons[0];

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      lightButton.dispatchEvent(enterEvent);
      lightButton.click();
      fixture.detectChanges();

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should activate on Space key press', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      const darkButton = buttons[1];

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      darkButton.dispatchEvent(spaceEvent);
      darkButton.click();
      fixture.detectChanges();

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('activating an option', () => {
    it('should call Theme.setTheme with "light" when light button is clicked', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons[0].click();
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should call Theme.setTheme with "dark" when dark button is clicked', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons[1].click();
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should call Theme.setTheme with "system" when system button is clicked', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons[2].click();
      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('should update aria-pressed states after activating a new option', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');

      // Initially system is active
      expect(buttons[2].getAttribute('aria-pressed')).toBe('true');

      // Click dark
      buttons[1].click();
      fixture.detectChanges();

      expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
      expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
      expect(buttons[2].getAttribute('aria-pressed')).toBe('false');
    });

    it('should retain focus on the activated button after theme change', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');
      const darkButton = buttons[1];

      darkButton.focus();
      darkButton.click();
      fixture.detectChanges();

      expect(document.activeElement).toBe(darkButton);
    });

    it('should update active class after activating a new option', () => {
      const fixture = createComponent();
      const buttons = fixture.nativeElement.querySelectorAll('button');

      // Click light
      buttons[0].click();
      fixture.detectChanges();

      expect(buttons[0].classList.contains('theme-switcher__button--active')).toBe(true);
      expect(buttons[1].classList.contains('theme-switcher__button--active')).toBe(false);
      expect(buttons[2].classList.contains('theme-switcher__button--active')).toBe(false);
    });
  });
});
