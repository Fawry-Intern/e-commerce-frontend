import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CustomerNavebareComponent } from '../../../components/customer-navebare/customer-navebare.component';
import { CustomerSidebarComponent } from '../../../components/customer-sidebar/customer-sidebar.component';
import { CardProductComponent } from '../../../components/card-product/card-product.component';

@Component({
  selector: 'app-customer-products',
  imports: [CardProductComponent, CustomerNavebareComponent, CustomerSidebarComponent],
  templateUrl: './customer-products.component.html',
  styleUrl: './customer-products.component.css'
})
export class CustomerProductsComponent {

}
