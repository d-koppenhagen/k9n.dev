import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterTimelineComponent } from './twitter-timeline.component';

describe('TwitterTimelineComponent', () => {
  let component: TwitterTimelineComponent;
  let fixture: ComponentFixture<TwitterTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
