import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStocksTableComponent } from './product-stocks-table.component';

describe('ProductStocksTableComponent', () => {
  let component: ProductStocksTableComponent;
  let fixture: ComponentFixture<ProductStocksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStocksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStocksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
