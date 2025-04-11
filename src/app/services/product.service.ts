import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminProduct } from '../dtos/product/admin-product.model';
import { catchError, Observable, of, throwError } from 'rxjs';
import {AdminProductComponent} from '../pages/admin/admin-product/admin-product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private headers: HttpHeaders = new HttpHeaders();
  private createdProduct: {  } | undefined;
  constructor(private httpClient: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all products
  getAllProducts(): Observable<AdminProduct[]> {
    this.updateHeaders();
    return this.httpClient.get<AdminProduct[]>(this.apiUrl, { headers: this.headers }).pipe(
      catchError(() => {
        console.warn('API failed, returning empty product list');
        return of([]);
      })
    );
  }

  // Create a new product
  createProduct(product: AdminProduct): Observable<AdminProduct> {
    this.updateHeaders();
    this.createdProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl
    };
    return this.httpClient.post<AdminProduct>(this.apiUrl, this.createdProduct, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error creating product:', error);
        return throwError(error);
      })
    );
  }

  // Delete a product by ID
  deleteProduct(productId: number): Observable<void> {
    this.updateHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/${productId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error deleting product with id ${productId}:`, error);
        return throwError(error);
      })
    );
  }

  // Fetch a single product by ID
  getProductById(productId: number): Observable<AdminProduct> {
    this.updateHeaders();
    return this.httpClient.get<AdminProduct>(`${this.apiUrl}/${productId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error fetching product with id ${productId}:`, error);
        return throwError(error);
      })
    );
  }

  // Search products by various criteria (optional)
  searchProducts(
    name?: string,
    description?: string,
    minPrice?: number,
    maxPrice?: number,
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    this.updateHeaders();
    const params = {
      name: name ?? '',
      description: description ?? '',
      minPrice: minPrice ? minPrice.toString() : '',
      maxPrice: maxPrice ? maxPrice.toString() : '',
      page: page.toString(),
      size: size.toString(),
    };
    return this.httpClient.get<any>(`${this.apiUrl}/search`, { headers: this.headers, params }).pipe(
      catchError((error) => {
        console.error('Error searching products:', error);
        return throwError(error);
      })
    );
  }
}
