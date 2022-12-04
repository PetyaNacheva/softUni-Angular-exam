import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosDetailPageComponent } from './photos-detail-page.component';

describe('PhotosDetailPageComponent', () => {
  let component: PhotosDetailPageComponent;
  let fixture: ComponentFixture<PhotosDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
