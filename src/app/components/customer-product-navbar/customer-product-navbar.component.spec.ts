import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductNavbarComponent } from './customer-product-navbar.component';

describe('CustomerProductNavbarComponent', () => {
  let component: CustomerProductNavbarComponent;
  let fixture: ComponentFixture<CustomerProductNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProductNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
