import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../models/product/product.model';
import { Store } from '../models/store/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = `${environment.apiUrl}/stores`;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
  }

  getAllStores(): Observable<Store[]> {
    return this.httpClient.get<Store[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('API failed, using demo stores');
        return of([]);
      })
    );
  }

  deleteStore(id: number): Observable<void> {
    this.updateHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error deleting store with id ${id}:`, error);
        return throwError(error);
      })
    );
  }

  getProductsByStoreId(storeId: number): Observable<Product[]> {
    this.updateHeaders();
    return this.httpClient.get<Product[]>(`${this.apiUrl}/${storeId}/products`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error(`Error fetching products for store with id ${storeId}:`, error);
        return throwError(error);
      })
    );
  }
}
