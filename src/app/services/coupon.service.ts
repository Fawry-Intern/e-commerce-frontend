import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateCouponRequest } from '../dtos/coupons/create-coupon-request';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:5051/api/coupons';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.updateHeaders();
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    });
    }
    createCoupon(createCouponRequest: CreateCouponRequest): Observable<any> {
      return this.http
        .post<{ message: string }>(`${this.apiUrl}/create`, createCouponRequest)
        .pipe(
          catchError((error) => {
            console.error('Coupon creation failed:', error);
            return throwError(() => new Error('Coupon creation failed. Please try again.'));
          })
        );
    }
}
