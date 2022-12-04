import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTopPageComponent } from './photos-top-page.component';

describe('PhotosTopPageComponent', () => {
  let component: PhotosTopPageComponent;
  let fixture: ComponentFixture<PhotosTopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosTopPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosTopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
