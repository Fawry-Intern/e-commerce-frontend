import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product/product.model';
import { Store } from '../models/store/store.model';
import { AdminStore } from '../dtos/store/admin-store.model';
import {catchError, Observable, of, throwError} from "rxjs";
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = `${environment.apiUrl}/stores`;
  private headers: HttpHeaders = new HttpHeaders();
  private createdStore: { name: string; address: string; } | undefined;

  constructor(private httpClient: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
  }

  getAllStores(): Observable<AdminStore[]> {
    this.updateHeaders();
    return this.httpClient.get<AdminStore[]>(this.apiUrl, { headers: this.headers }).pipe(
      catchError(() => {
        console.warn('API failed, using demo stores');
        return of([]);
      })
    );
  }

  getAllStoresForCustomer(): Observable<Store[]> {
    this.updateHeaders();
    return this.httpClient.get<Store[]>(
       `${this.apiUrl}`, {headers: this.headers}).pipe(
      catchError(() => {
        console.warn('API failed, using demo stores');
        return of([]);
      })
    );
  }

  createStore(store: AdminStore): Observable<AdminStore> {
    this.updateHeaders();
  
    return this.httpClient.post<AdminStore>(this.apiUrl, store, { headers: this.headers }).pipe(
      catchError((error) => {
        return throwError(error);
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
  getProductsByStoreId(storeId: number,page: number , size: number): Observable<Page<Product[]>> {
    this.updateHeaders();
    return this.httpClient.get<Page<Product[]>>(`${this.apiUrl}/${storeId}/products?page=${page}&size=${size}`,{headers: this.headers}).pipe(
        catchError((error) => {
          console.error(`Error fetching products for store with id ${storeId}:`, error);
          return throwError(error);
        })
    );
  }
}
