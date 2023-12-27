import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostComponent } from './share-post.component';

describe('SharePostComponent', () => {
  let component: SharePostComponent;
  let fixture: ComponentFixture<SharePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
