import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarItemDetailsComponent } from './bazar-item-details.component';

describe('BazarItemDetailsComponent', () => {
  let component: BazarItemDetailsComponent;
  let fixture: ComponentFixture<BazarItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
