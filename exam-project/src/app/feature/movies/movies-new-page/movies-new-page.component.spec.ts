import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNewPageComponent } from './movies-new-page.component';

describe('MoviesNewPageComponent', () => {
  let component: MoviesNewPageComponent;
  let fixture: ComponentFixture<MoviesNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});