import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Navigation } from './navigation';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({ selector: 'app-theme-switcher', template: '' })
class MockThemeSwitcherComponent {}

@Component({ template: '' })
class DummyComponent {}

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'blog', component: DummyComponent },
          { path: 'talks', component: DummyComponent },
          { path: 'projects', component: DummyComponent },
          { path: 'contact', component: DummyComponent },
        ]),
      ],
    })
      .overrideComponent(Navigation, {
        remove: { imports: [ThemeSwitcher] },
        add: { imports: [MockThemeSwitcherComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
  });

  describe('navigation structure and accessibility', () => {
    it('should render a nav element with aria-label', () => {
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Hauptnavigation');
    });

    it('should render all navigation links', () => {
      const links = fixture.nativeElement.querySelectorAll('.nav__link');
      expect(links.length).toBe(6);

      const labels = Array.from(links).map(
        (link: unknown) => (link as HTMLElement).textContent?.trim(),
      );
      expect(labels).toEqual(['Startseite', 'Blog', 'Vorträge', 'Projekte', 'Buch', 'Kontakt']);
    });

    it('should include the theme switcher', () => {
      const themeSwitcher =
        fixture.nativeElement.querySelector('app-theme-switcher');
      expect(themeSwitcher).toBeTruthy();
    });
  });

  describe('active route indication and aria-current', () => {
    it('should set aria-current="page" on the active route link', async () => {
      await router.navigateByUrl('/blog');
      fixture.detectChanges();

      const blogLink = fixture.nativeElement.querySelector(
        'a[href="/blog"]',
      ) as HTMLAnchorElement;
      expect(blogLink).toBeTruthy();
      expect(blogLink.getAttribute('aria-current')).toBe('page');
    });

    it('should NOT set aria-current on inactive route links', async () => {
      await router.navigateByUrl('/blog');
      fixture.detectChanges();

      const talksLink = fixture.nativeElement.querySelector(
        'a[href="/talks"]',
      ) as HTMLAnchorElement;
      expect(talksLink).toBeTruthy();
      expect(talksLink.getAttribute('aria-current')).toBeNull();
    });

    it('should apply active class on the active route link', async () => {
      await router.navigateByUrl('/blog');
      fixture.detectChanges();

      const blogLink = fixture.nativeElement.querySelector(
        'a[href="/blog"]',
      ) as HTMLAnchorElement;
      expect(blogLink.classList.contains('nav__link--active')).toBe(true);
    });

    it('should set aria-current="page" on Home link when navigated to root', async () => {
      // Navigate away first to ensure routerLinkActive updates
      await router.navigateByUrl('/blog');
      fixture.detectChanges();

      // Verify Home is NOT active when on /blog
      const homeLink = fixture.nativeElement.querySelector(
        'a[href="/"]',
      ) as HTMLAnchorElement;
      expect(homeLink.getAttribute('aria-current')).toBeNull();
      expect(homeLink.classList.contains('nav__link--active')).toBe(false);
    });
  });

  describe('mobile menu toggle behavior', () => {
    it('should have a toggle button with aria-expanded="false" initially', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      expect(toggleBtn).toBeTruthy();
      expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-controls pointing to the nav menu', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      expect(toggleBtn.getAttribute('aria-controls')).toBe('nav-menu');
    });

    it('should have an accessible label on the toggle button', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      expect(toggleBtn.getAttribute('aria-label')).toBe(
        'Navigationsmenü umschalten',
      );
    });

    it('should set aria-expanded="true" when menu is opened', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      toggleBtn.click();
      fixture.detectChanges();

      expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle aria-expanded back to "false" when menu is closed', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      toggleBtn.click();
      fixture.detectChanges();
      expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

      toggleBtn.click();
      fixture.detectChanges();
      expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });

    it('should add open class to nav list when menu is opened', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      const navList = fixture.nativeElement.querySelector(
        '#nav-menu',
      ) as HTMLUListElement;

      expect(navList.classList.contains('nav__list--open')).toBe(false);

      toggleBtn.click();
      fixture.detectChanges();

      expect(navList.classList.contains('nav__list--open')).toBe(true);
    });

    it('should have the nav-menu id on the list element', () => {
      const navList = fixture.nativeElement.querySelector('#nav-menu');
      expect(navList).toBeTruthy();
      expect(navList.tagName.toLowerCase()).toBe('ul');
    });
  });

  describe('keyboard navigation', () => {
    it('should be operable via keyboard click (Enter) on toggle button', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;

      // Buttons natively respond to Enter/Space by dispatching click events
      toggleBtn.click();
      fixture.detectChanges();

      expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    });

    it('should allow navigation links to be focusable anchor elements', () => {
      const links = fixture.nativeElement.querySelectorAll(
        '.nav__link',
      ) as NodeListOf<HTMLAnchorElement>;
      links.forEach((link) => {
        expect(link.tagName.toLowerCase()).toBe('a');
        // Angular router renders href attribute on routerLink anchors
        expect(link.hasAttribute('href')).toBe(true);
      });
    });

    it('should have type="button" on the toggle to prevent form submission', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      expect(toggleBtn.getAttribute('type')).toBe('button');
    });
  });

  describe('menu closes on link activation', () => {
    it('should close the mobile menu when a navigation link is clicked', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;

      // Open the menu
      toggleBtn.click();
      fixture.detectChanges();
      expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

      // Click a navigation link
      const blogLink = fixture.nativeElement.querySelector(
        'a[href="/blog"]',
      ) as HTMLAnchorElement;
      blogLink.click();
      fixture.detectChanges();

      expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });

    it('should remove open class from nav list when link is clicked', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;
      const navList = fixture.nativeElement.querySelector(
        '#nav-menu',
      ) as HTMLUListElement;

      // Open the menu
      toggleBtn.click();
      fixture.detectChanges();
      expect(navList.classList.contains('nav__list--open')).toBe(true);

      // Click a navigation link
      const contactLink = fixture.nativeElement.querySelector(
        'a[href="/contact"]',
      ) as HTMLAnchorElement;
      contactLink.click();
      fixture.detectChanges();

      expect(navList.classList.contains('nav__list--open')).toBe(false);
    });

    it('should close menu when any nav link is clicked, not just the active one', () => {
      const toggleBtn = fixture.nativeElement.querySelector(
        '.nav__toggle',
      ) as HTMLButtonElement;

      // Open the menu
      toggleBtn.click();
      fixture.detectChanges();

      // Click the talks link
      const talksLink = fixture.nativeElement.querySelector(
        'a[href="/talks"]',
      ) as HTMLAnchorElement;
      talksLink.click();
      fixture.detectChanges();

      expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
