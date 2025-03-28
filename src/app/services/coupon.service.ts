import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCouponRequest } from '../dtos/coupons/create-coupon-request';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8081/api';
  private headers: HttpHeaders = new HttpHeaders();
  httpClient: any;

  constructor(private http: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    });
    }
    createCoupon(createCouponRequest: CreateCouponRequest): Observable<String> {
        return this.httpClient
          .post<String>(`${this.apiUrl}/coupons/create`, createCouponRequest)
          .pipe(
            catchError((error) => {
              console.error('Sign-up failed', error);
              throw error; 
            })
          );
      }
}
