import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTopListComponent } from './photos-top-list.component';

describe('PhotosTopListComponent', () => {
  let component: PhotosTopListComponent;
  let fixture: ComponentFixture<PhotosTopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosTopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosTopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
