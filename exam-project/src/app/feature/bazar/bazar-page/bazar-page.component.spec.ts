import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarPageComponent } from './bazar-page.component';

describe('BazarPageComponent', () => {
  let component: BazarPageComponent;
  let fixture: ComponentFixture<BazarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
