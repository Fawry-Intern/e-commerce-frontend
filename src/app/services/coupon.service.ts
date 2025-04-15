import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateCouponRequest } from '../dtos/coupons/create-coupon-request';
import { Coupon } from '../models/coupon/coupon.model';
import { ConsumedCoupon } from '../models/coupon/consumption.model';
import { environment } from '../../environments/environment';
import { DiscountDetails } from '../dtos/coupons/discount-details';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = `${environment.apiUrl}/coupons`;
  private consumptionUrl = `${environment.apiUrl}/consumptions`;
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
      this.updateHeaders();
      return this.http.post<{ message: string }>(`${this.apiUrl}/create`,createCouponRequest,{headers: this.headers}).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Coupon creation failed:', error);
    
        
          let errorMessage = 'Coupon creation failed. Please try again.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message; 
          }
    
          return throwError(() => new Error(errorMessage));
        })
      );
    }

    getAllCoupons(): Observable<Coupon[]> {
                this.updateHeaders();
                return this.http.get<Coupon[]>(`${this.apiUrl}`, { headers: this.headers }).pipe(
                    catchError((error) => {
                        console.error('Getting all users failed:', error);
                        throw error;
                    })
                );
    }

    activateCoupon(couponCode: String): Observable<void> {
        this.updateHeaders();
        return this.http.put<void>(`${this.apiUrl}/${couponCode}/activate`, {}, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Activating coupon failed:', error);
                throw error;
            })
        );
    }

    deactivateCoupon(couponCode: String): Observable<void> {
        this.updateHeaders();
        return this.http.put<void>(`${this.apiUrl}/${couponCode}/deactivate`, {}, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Deactivating coupon failed:', error);
                throw error;
            })
        );
    }

    deleteCoupon(couponCode: String): Observable<void> {
        this.updateHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${couponCode}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Deleting coupon failed:', error);
                throw error;
            })
        );
    }

    getAllConsumedCoupons(): Observable<ConsumedCoupon[]> {
        this.updateHeaders();
        return this.http.get<ConsumedCoupon[]>(`${this.consumptionUrl}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting all consumed coupons failed:', error);
                throw error;
            })
        );
    }

    checkCoupon(couponCode:String,amount:Number):Observable<DiscountDetails>{
this.updateHeaders();
return this.http.get<DiscountDetails>(`${this.apiUrl}/check/${couponCode}?amount=${amount}`, { headers: this.headers }).pipe(
    catchError((error) => {
        console.error('checking coupon failed:', error);
        throw error;
    })
);

    }

}
