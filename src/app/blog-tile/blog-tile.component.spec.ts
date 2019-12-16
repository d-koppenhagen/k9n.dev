import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTileComponent } from './blog-tile.component';

describe('BlogTileComponent', () => {
  let component: BlogTileComponent;
  let fixture: ComponentFixture<BlogTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
