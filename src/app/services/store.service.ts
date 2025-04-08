import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminStore } from '../dtos/store/admin-store.model';
import {catchError, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = `${environment.apiUrl}/api/stores`;
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

  getAllStores(): Observable<AdminStore[]> {
    this.updateHeaders();
    return this.httpClient.get<AdminStore[]>(this.apiUrl, { headers: this.headers }).pipe(
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

  // You can add more CRUD methods (createStore, updateStore, etc.) as needed.
}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class StoreService {
    private store: any = null; // Initialize store as null

    constructor() {
        this.loadStoreFromLocalStorage(); // Load the store from local storage on initialization
    }

    private loadStoreFromLocalStorage(): void {
        const storedData = localStorage.getItem('store');
        if (storedData) {
            this.store = JSON.parse(storedData);
        } else {
            this.store = {}; // Initialize with an empty object if no data is found
        }
    }
}