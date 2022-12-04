import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarListComponent } from './bazar-list.component';

describe('BazarListComponent', () => {
  let component: BazarListComponent;
  let fixture: ComponentFixture<BazarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
