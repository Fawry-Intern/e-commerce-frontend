import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../dtos/orders/order-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { CouponService } from '../../../services/coupon.service';
import { OrderRequest } from '../../../dtos/orders/order-request.model';

interface Governorate {
  id: string;
  governorate_name_en: string;
  governorate_name_ar: string;
}

interface City {
  id: string;
  governorate_id: string;
  city_name_en: string;
  city_name_ar: string;
}

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

  governorates: Governorate[] = [];
  cities: City[] = [];
  filteredCities: City[] = [];

  constructor(private orderService: OrderService, private couponService: CouponService) {
    // Load governorates and cities data
    this.loadLocationData();
  }

  ngOnInit() {
    this.cartItems = this.orderService.getCart();
    this.order.orderItems = this.cartItems;
    this.order.totalAmount = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  loadLocationData() {
    // Load governorates
    fetch('assets/data/governorates.json')
      .then(response => response.json())
      .then(data => {
        // Find the array element that contains the governorates data
        const governoratesData = data.find((item: any) => item.name === 'governorates');
        if (governoratesData && governoratesData.data) {
          this.governorates = governoratesData.data;
        }
      })
      .catch(error => console.error('Error loading governorates:', error));

    // Load cities
    fetch('assets/data/cities.json')
      .then(response => response.json())
      .then(data => {
        // Find the array element that contains the cities data
        const citiesData = data.find((item: any) => item.name === 'cities');
        if (citiesData && citiesData.data) {
          this.cities = citiesData.data;
        }
      })
      .catch(error => console.error('Error loading cities:', error));
  }

  onGovernorateChange(event: any) {
    const selectedGovernorateId = this.governorates.find(
      gov => gov.governorate_name_en === event.target.value
    )?.id;

    if (selectedGovernorateId) {
      this.filteredCities = this.cities.filter(
        city => city.governorate_id === selectedGovernorateId
      );
      // Reset city selection when governorate changes
      this.order.addressDetails.city = '';
    }
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
