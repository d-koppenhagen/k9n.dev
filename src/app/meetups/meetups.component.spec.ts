import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupsComponent } from './meetups.component';

describe('MeetupsComponent', () => {
  let component: MeetupsComponent;
  let fixture: ComponentFixture<MeetupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupsComponent]
    });
    fixture = TestBed.createComponent(MeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
