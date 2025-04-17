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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  error: string | null = null;
  storeId: number = 0;
  currentPage = -1;
  totalPages = 0;
  pageSize = 10;
  isLoading = false;
  searchQuery: string = '';

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('storeId');
      if (idParam) {
        this.storeId = +idParam;
        console.log(this.storeId);
        
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    if (this.isLoading) return;
    console.log(this.currentPage + 1 >= this.totalPages);
    
    this.isLoading = true;
    this.currentPage++;

    this.storeService.getProductsByStoreId(this.storeId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        const newProducts = Array.isArray(response.content) ? response.content : [response.content];
        this.products = [...this.products, ...newProducts.flat()];
        this.totalPages = response.totalPages;
        this.handleAppendedProductsToFilteredProducts(newProducts);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Failed to load products. Please try again.';
        this.isLoading = false;
      }
    });
    console.log(this.filterProducts);
    
    
  }
  handleAppendedProductsToFilteredProducts(newProducts: Product[]) {
    if (this.searchQuery) {
      const newFilteredProducts = newProducts.flat().filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredProducts = [...this.filteredProducts, ...newFilteredProducts];
    } else {
      this.filteredProducts = [...this.products];
    }
  }


  handleSearch(searchText: string): void {
    this.searchQuery = searchText;
    this.filteredProducts = this.filterProducts(searchText);
  }

  private filterProducts(query: string): Product[] {
    if (!query) return this.products;
    return this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  trackByFn(index: number, item: Product) {
    return item.id; 
  }
}