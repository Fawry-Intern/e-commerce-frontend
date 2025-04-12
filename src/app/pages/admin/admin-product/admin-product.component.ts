import { Component } from '@angular/core';
import {AdminSidebarComponent} from '../../../components/admin-sidebar/admin-sidebar.component';
import {StoresTableComponent} from '../../../components/stores-table/stores-table.component';
import {ProductsTableComponent} from '../../../components/products-table/products-table.component';

@Component({
  selector: 'app-admin-product',
  imports: [
    AdminSidebarComponent,
    ProductsTableComponent
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent {

}
