import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { OrderRequest } from "../dtos/orders/order-request.model";
import { OrderItem } from "../dtos/orders/order-item.model";

@Injectable({
    providedIn: 'root'
  })
export class OrderService{
    
    private readonly CART_KEY = 'shopping_cart';
    private apiUrl = `${environment.apiUrl}/orders`;
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
    createOrder(orderCreation:OrderRequest):Observable<any>{

        return this.httpClient.post<any>(`${this.apiUrl}`,orderCreation, { headers: this.headers })
            .pipe(
                catchError((error) => {
                    console.error('order creation failed', error);
                    throw error;
                })
            );
    }


    addToCart(newItem: OrderItem): void {
      let cart: OrderItem[] = this.getCart();
        cart.push(newItem);
      
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  
    getCart(): OrderItem[] {
      const stored = localStorage.getItem(this.CART_KEY);
      return stored ? JSON.parse(stored) : [];
    }
  
    clearCart(): void {
      localStorage.removeItem(this.CART_KEY);
    }
}