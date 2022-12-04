import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarItemComponent } from './bazar-item.component';

describe('BazarItemComponent', () => {
  let component: BazarItemComponent;
  let fixture: ComponentFixture<BazarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
