import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumedCouponsTableComponent } from './consumed-coupons-table.component';

describe('ConsumedCouponsTableComponent', () => {
  let component: ConsumedCouponsTableComponent;
  let fixture: ComponentFixture<ConsumedCouponsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumedCouponsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumedCouponsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
