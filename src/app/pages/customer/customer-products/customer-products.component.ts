import { Component } from "@angular/core";
import { CardProductComponent } from "../../../components/card-product/card-product.component";
import { CustomerNavebareComponent } from "../../../components/customer-navebare/customer-navebare.component";
import { CustomerSidebarComponent } from "../../../components/customer-sidebar/customer-sidebar.component";
import { CustomerProductNavbarComponent } from "../../../components/customer-product-navbar/customer-product-navbar.component";
import { CommonModule } from "@angular/common";
import { Product } from "../../../models/product/product.model";
import { StoreService } from "../../../services/store.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-customer-products',
  imports: [CommonModule,CustomerProductNavbarComponent, CardProductComponent],
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css'],
})
export class CustomerProductsComponent {
  products : Product[] = [];
  filteredProducts = this.products;
  error: string | null = null;
  storeId: number = 0;

  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('storeId');
      if (idParam) {
        this.storeId = +idParam; // convert to number
        console.log('Store ID:', this.storeId);
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.error = null;
    
    
    this.storeService.getProductsByStoreId(this.storeId).subscribe({
      next: (response) => {
      this.products = response;
      this.filteredProducts = this.products;
      console.log('Products loaded:', this.products);
      },
      error: (error) => { 
      console.error('Error loading products:', error);
      this.error = 'Failed to load products. Please try again.';
      }
    });
  }

  handleSearch(searchText: string) {
    console.log("Search text:", searchText); // Debugging line
    
    if (searchText) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  
}
