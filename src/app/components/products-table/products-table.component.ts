import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AdminProduct} from '../../dtos/product/admin-product.model';
import {Router} from '@angular/router';
import bootstrap from 'bootstrap';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products-table',
  imports: [
    FormsModule
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {
  // Search query for filtering products
  searchQuery: string = '';
  // Full list of products fetched from the service
  @Input() products: AdminProduct[] = [];
  // List of products displayed after filtering
  filteredProducts: AdminProduct[] = [];
  selectedProduct: AdminProduct = { id: 0, name: '', price: 0, description: '', imageUrl: '' };
  newProduct: AdminProduct = { id: 0, name: '', price: 0, description: '', imageUrl: '' };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch products from the backend via the service
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: AdminProduct[]) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Filter products based on the search query
  filterProducts(): void {
    if (!this.searchQuery) {
      this.filteredProducts = this.products;
      return;
    }
    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter((product: AdminProduct) =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }

  // Navigate to a detailed view for a product
  viewProductDetails(product: AdminProduct): void {
    this.selectedProduct = { ...product };

    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Delete a product after confirmation
  deleteProduct(product: AdminProduct): void {
    if (confirm(`Are you sure you want to delete the product "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          // Remove the deleted product from the local list and reapply filter
          this.products = this.products.filter(p => p.id !== product.id);
          this.filterProducts();
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  // Show the modal to create a new product
  createProduct(): void {
    this.newProduct = { id: 0, name: '', price: 0, description: '', imageUrl: '' };

    const modalElement = document.getElementById('createProductModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Add the new product
  addProduct(): void {
    if (this.newProduct.name.trim() && this.newProduct.price && this.newProduct.description.trim()) {
      this.productService.createProduct(this.newProduct).subscribe({
        next: (createdProduct: AdminProduct) => {
          this.products.push(createdProduct);
          this.filterProducts();

          const modalElement = document.getElementById('createProductModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (err: any) => {
          console.error('Error creating product:', err);
        }
      });
    }
  }
}
