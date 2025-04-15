import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../dtos/orders/order-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { CouponService } from '../../../services/coupon.service';
import { OrderRequest } from '../../../dtos/orders/order-request.model';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
  cartItems: OrderItem[] = [];
  discount: number = 0;

  order: OrderRequest = {
    customerName: '',
    customerContact: '',
    addressDetails: {
      governorate: '',
      city: '',
      address: ''
    },
    totalAmount: 0,
    couponCode: '',
    orderItems: [],
    paymentMethod: {
      details: {
        number: '',
        cvv: '',
        expiry: ''
      }
    }
  };

  constructor(private orderService: OrderService, private couponService: CouponService) {}

  ngOnInit() {
    this.cartItems = this.orderService.getCart();
    this.order.orderItems = this.cartItems;
    this.order.totalAmount = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  get finalAmount(): number {
    return this.order.totalAmount - this.discount;
  }

  applyDiscount() {
    this.couponService.checkCoupon(this.order.couponCode, this.order.totalAmount).subscribe({
      next: (response) => {
        this.discount = response.actualDiscount;
        alert(`Coupon applied! You got a discount of $${this.discount}.`);
      },
      error: (error) => {
        this.discount = 0;
        alert('Invalid or expired coupon. Please try another.');
      }
    });
  }
  
  submitOrder() {
    alert('Processing your order...');
    this.orderService.createOrder(this.order).subscribe({
      next: (response) => {
        alert('Order placed successfully!');
        this.orderService.clearCart();
        console.log(response);
      },
      error: (error) => {
        alert('Something went wrong while submitting your order. Please try again.');
        console.error(error);
      }
    });
  }
  
}
