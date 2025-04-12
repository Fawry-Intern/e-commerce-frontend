import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsStoreComponent } from './admin-products-store.component';

describe('AdminProductsStoreComponent', () => {
  let component: AdminProductsStoreComponent;
  let fixture: ComponentFixture<AdminProductsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
