import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ProductStocksTableComponent } from '../../../components/product-stocks-table/product-stocks-table.component';

@Component({
  selector: 'app-admin-products-store',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    ProductStocksTableComponent,
  ],
  templateUrl: './admin-products-store.component.html',
  styleUrl: './admin-products-store.component.css'
})
export class AdminProductsStoreComponent implements OnInit {
  storeId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.storeId = +idParam;
      }
    });
  }
}
