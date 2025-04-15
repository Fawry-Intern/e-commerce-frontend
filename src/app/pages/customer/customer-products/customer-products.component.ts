import { Component } from "@angular/core";
import { CardProductComponent } from "../../../components/card-product/card-product.component";
import { CommonModule } from "@angular/common";
import { Product } from "../../../models/product/product.model";
import { StoreService } from "../../../services/store.service";
import { ActivatedRoute } from "@angular/router";
import { CustomerNavebareComponent } from "../../../components/customer-navebare/customer-navebare.component";
import { FormsModule } from "@angular/forms";
import { CustomerProductNavbarComponent } from "../../../components/customer-product-navbar/customer-product-navbar.component";

@Component({
  selector: 'app-customer-products',
  imports: [CommonModule, CardProductComponent, CustomerNavebareComponent, FormsModule, CustomerProductNavbarComponent],
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.css'],
})
export class CustomerProductsComponent {
  products : Product[] = [];
  filteredProducts = this.products;
  error: string | null = null;
  storeId: number = 0;
  currentPage = -1;
  totalPages = 0;
  pageSize = 10;

  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('storeId');
      if (idParam) {
        this.storeId = +idParam;
        console.log('Store ID:', this.storeId);
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.error = null;
    this.nextPage();
    
    this.storeService.getProductsByStoreId(this.storeId,this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
      this.products = [...this.products, ...(Array.isArray(response.content) ? response.content : [response.content]).flat()];
      console.log(this.products,'from test');
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
      this.filteredProducts = this.products;
      console.log('filtered Products loaded:', this.filteredProducts);
      },
      error: (error) => { 
      console.error('Error loading products:', error);
      this.error = 'Failed to load products. Please try again.';
      }
    });
  }
  
  nextPage(): Number {
   
    this.currentPage++;
    return this.currentPage ;
  
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
