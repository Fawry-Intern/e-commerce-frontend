import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductStock } from '../../dtos/store/product-stock.model';
import { ProductStockService } from '../../services/productStock.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product/product.model';

@Component({
  selector: 'app-product-stocks-table',
  standalone: true, // Add standalone: true for standalone components
  imports: [
    FormsModule,
    CommonModule,
    NgOptimizedImage,
  ],
  templateUrl: './product-stocks-table.component.html',
  styleUrl: './product-stocks-table.component.css'
})
export class ProductStocksTableComponent implements OnInit, OnChanges {
  @Input() productStocks: ProductStock[] = [];
  @Input() storeId: number = 0;
  filteredProductStocks: ProductStock[] = [];
  products: Product[] = [];
  searchQuery: string = '';

  selectedProductStock: ProductStock = {
    id: 0,
    productId: 0,
    productName: '',
    productPrice: 0,
    productDescription: '',
    productImage: '',
    storeId: 0,
    stockAvailableQuantity: 0
  };

  newProduct: ProductStock = {
    id: 0,
    productId: 0,
    productName: '',
    productPrice: 0,
    productDescription: '',
    productImage: '',
    storeId: 0,
    stockAvailableQuantity: 0
  };

  constructor(
    private productStockService: ProductStockService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storeId > 0) {
      this.fetchProducts();
    }
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // Add ngOnChanges to detect when storeId input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['storeId'] && !changes['storeId'].firstChange && this.storeId > 0) {
      this.fetchProducts();
    }
  }

  fetchProducts(): void {
    console.log('Fetching products for store ID:', this.storeId);
    this.productStockService.getStockByStore(this.storeId).subscribe({
      next: (productStocks: ProductStock[]) => {
        this.productStocks = productStocks;
        this.filteredProductStocks = productStocks;
      },
      error: (err: any) => {
        console.error('Error fetching productStocks:', err);
      }
    });
  }

  filterProducts(): void {
    if (!this.searchQuery) {
      this.filteredProductStocks = this.productStocks;
      return;
    }
    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredProductStocks = this.productStocks.filter(productStocks =>
      productStocks.productName.toLowerCase().includes(lowerQuery)
    );
  }

  viewProductStockDetails(productStocks: ProductStock): void {
    this.selectedProductStock = { ...productStocks };
    console.log(this.selectedProductStock)
    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  deleteProduct(productStock: ProductStock): void {
    if (confirm(`Are you sure you want to delete the productStock "${productStock.productName}"?`)) {
      this.productStockService.deleteStock(productStock.id).subscribe({
        next: () => {
          this.productStocks = this.productStocks.filter(p => p.id !== productStock.id);
          this.filterProducts();
        },
        error: (err: any) => {
          console.error('Error deleting productStock:', err);
        }
      });
    }
  }

  createProduct(): void {
    this.newProduct = {
      id: 0,
      productId: 0,
      productName: '',
      productPrice: 0,
      productDescription: '',
      productImage: '',
      storeId: this.storeId, // Set the store ID from the input
      stockAvailableQuantity: 0
    };
    const modalElement = document.getElementById('createProductModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  addProduct(): void {
    if (this.newProduct.productId && this.newProduct.stockAvailableQuantity > 0) {
      this.newProduct.productId = Number(this.newProduct.productId);
      this.newProduct.storeId = this.storeId;
      this.productStockService.createStock(this.newProduct).subscribe({
        next: (createdProduct: ProductStock) => {

          const exists = this.productStocks.some
                  ((stock) => stock.productId === createdProduct.productId);
          if (exists) {
            this.productStocks = this.productStocks.map((stock) =>
              stock.productId === createdProduct.productId
                ? { ...stock, stockAvailableQuantity:
                     createdProduct.stockAvailableQuantity }
                : stock
            );
          } else {
            this.productStocks.push(createdProduct);
          }

          this.filterProducts();

          const modalElement = document.getElementById('createProductModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }

          this.newProduct.productId = 0;
          this.newProduct.stockAvailableQuantity = 0;
        },
        error: (err: any) => {
          console.error('Error creating product stock:', err);
        }
      });
    } else {
      console.warn('Product ID or Stock Quantity is missing!');
    }
  }



}
