import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminProduct } from '../../dtos/product/admin-product.model';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ProductService } from '../../services/product.service';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: AdminProduct[] = [];
  filteredProducts: AdminProduct[] = [];

  searchQuery: string = '';

  selectedProduct: AdminProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: ''
  };

  newProduct: AdminProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

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

  filterProducts(): void {
    if (!this.searchQuery) {
      this.filteredProducts = this.products;
      return;
    }
    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }

  viewProductDetails(product: AdminProduct): void {
    this.selectedProduct = { ...product };
    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  deleteProduct(product: AdminProduct): void {
    if (confirm(`Are you sure you want to delete the product "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.filterProducts();
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  createProduct(): void {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: ''
    };
    const modalElement = document.getElementById('createProductModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

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

  openEditModal(product: AdminProduct): void {
    this.selectedProduct = { ...product };
    const modalElement = document.getElementById('editProductModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  editProduct(product: AdminProduct): void {
    if (product.name.trim() && product.price && product.description.trim()) {
      this.productService.updateProduct(product).subscribe({
        next: (updatedProduct: AdminProduct) => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.filterProducts();

          const modalElement = document.getElementById('editProductModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (err: any) => {
          console.error('Error updating product:', err);
        }
      });
    }
  }
}
