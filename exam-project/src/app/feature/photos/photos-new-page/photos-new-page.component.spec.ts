import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosNewPageComponent } from './photos-new-page.component';

describe('PhotosNewPageComponent', () => {
  let component: PhotosNewPageComponent;
  let fixture: ComponentFixture<PhotosNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
