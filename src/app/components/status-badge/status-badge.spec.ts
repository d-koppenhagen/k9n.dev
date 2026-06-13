import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { StatusBadge, ProjectStatus } from './status-badge';

@Component({
  template: `<app-status-badge [status]="status" />`,
  imports: [StatusBadge],
})
class TestHost {
  status: ProjectStatus = 'active';
}

describe('StatusBadge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
  });

  function createComponent(status: ProjectStatus) {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.status = status;
    fixture.detectChanges();
    return fixture;
  }

  describe('rendering', () => {
    it('should render the status text', () => {
      const fixture = createComponent('active');
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.textContent).toContain('active');
    });

    it('should render the icon with aria-hidden', () => {
      const fixture = createComponent('active');
      const icon = fixture.nativeElement.querySelector('.status-badge__icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('status classes', () => {
    it('should apply active class for active status', () => {
      const fixture = createComponent('active');
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--active')).toBe(true);
    });

    it('should apply maintained class for maintained status', () => {
      const fixture = createComponent('maintained');
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--maintained')).toBe(true);
    });

    it('should apply archived class for archived status', () => {
      const fixture = createComponent('archived');
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--archived')).toBe(true);
    });

    it('should NOT apply other status classes', () => {
      const fixture = createComponent('active');
      const badge = fixture.nativeElement.querySelector('.status-badge');
      expect(badge.classList.contains('status-badge--maintained')).toBe(false);
      expect(badge.classList.contains('status-badge--archived')).toBe(false);
    });
  });

  describe('icons', () => {
    it('should show filled circle for active', () => {
      const fixture = createComponent('active');
      const icon = fixture.nativeElement.querySelector('.status-badge__icon');
      expect(icon.textContent.trim()).toBe('\u25cf');
    });

    it('should show half circle for maintained', () => {
      const fixture = createComponent('maintained');
      const icon = fixture.nativeElement.querySelector('.status-badge__icon');
      expect(icon.textContent.trim()).toBe('\u25d0');
    });

    it('should show empty circle for archived', () => {
      const fixture = createComponent('archived');
      const icon = fixture.nativeElement.querySelector('.status-badge__icon');
      expect(icon.textContent.trim()).toBe('\u25cb');
    });
  });

  describe('accessibility', () => {
    it('should have role="status" on the host element', () => {
      const fixture = createComponent('active');
      const host = fixture.nativeElement.querySelector('app-status-badge');
      expect(host.getAttribute('role')).toBe('status');
    });

    it('should have an aria-label containing the status', () => {
      const fixture = createComponent('maintained');
      const host = fixture.nativeElement.querySelector('app-status-badge');
      const label = host.getAttribute('aria-label');
      expect(label).toContain('maintained');
    });
  });
});
