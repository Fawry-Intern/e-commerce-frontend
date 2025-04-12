import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import {ProductStock} from '../dtos/store/product-stock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {
  private apiUrl = `${environment.apiUrl}/stocks`;
  private headers: HttpHeaders = new HttpHeaders();
  private createdStock: { } | undefined;

  constructor(private httpClient: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all stock items for a specific store
  getStockByStore(storeId: number): Observable<ProductStock[]> {
    this.updateHeaders();
    return this.httpClient.get<ProductStock[]>(`${this.apiUrl}/store/${storeId}`, { headers: this.headers }).pipe(
      catchError(() => {
        console.warn('API failed, returning empty stock list');
        return of([]);
      })
    );
  }

  // Fetch stock by its ID
  getStockById(stockId: number): Observable<ProductStock> {
    this.updateHeaders();
    return this.httpClient.get<ProductStock>(`${this.apiUrl}/${stockId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error fetching stock with id ${stockId}:`, error);
        return throwError(error);
      })
    );
  }

  // Create a new stock entry
  createStock(stock: ProductStock): Observable<ProductStock> {
    this.updateHeaders();
    this.createdStock = {
      productId: stock.productId,
      storeId: stock.storeId,
      stockAvailableQuantity: stock.stockAvailableQuantity
    };
    return this.httpClient.post<ProductStock>(this.apiUrl, this.createdStock, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error creating stock:', error);
        return throwError(error);
      })
    );
  }

  // Delete a stock entry by its ID
  deleteStock(stockId: number): Observable<void> {
    this.updateHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/${stockId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error deleting stock with id ${stockId}:`, error);
        return throwError(error);
      })
    );
  }
}
