import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonDashboardComponent } from './delivery-person-dashboard.component';

describe('DeliveryPersonDashboardComponent', () => {
  let component: DeliveryPersonDashboardComponent;
  let fixture: ComponentFixture<DeliveryPersonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPersonDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPersonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
