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
        return of([
          { id: 1, name: 'Store A', address: '123 Main St, Springfield' },
          { id: 2, name: 'Store B', address: '456 Elm St, Shelbyville' },
          { id: 3, name: 'Store C', address: '789 Oak St, Capital City' },
          { id: 4, name: 'Store D', address: '101 Maple Ave, Ogdenville' },
          { id: 5, name: 'Store E', address: '202 Pine Rd, North Haverbrook' }
        ]);
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
