import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNewCommentComponent } from './movies-new-comment.component';

describe('MoviesNewCommentComponent', () => {
  let component: MoviesNewCommentComponent;
  let fixture: ComponentFixture<MoviesNewCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesNewCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesNewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});