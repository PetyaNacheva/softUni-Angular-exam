import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarNewOfferComponent } from './bazar-new-offer.component';

describe('BazarNewOfferComponent', () => {
  let component: BazarNewOfferComponent;
  let fixture: ComponentFixture<BazarNewOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarNewOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarNewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
