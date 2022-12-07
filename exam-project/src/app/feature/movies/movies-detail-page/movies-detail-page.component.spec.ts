import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDetailPageComponent } from './movies-detail-page.component';

describe('MoviesDetailPageComponent', () => {
  let component: MoviesDetailPageComponent;
  let fixture: ComponentFixture<MoviesDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});