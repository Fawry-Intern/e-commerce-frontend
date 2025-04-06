import { Component, Input, SimpleChanges } from '@angular/core';
import { ConsumedCoupon } from '../../../models/coupon/consumption.model';
import { CouponService } from '../../../services/coupon.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-consumed-coupons-table',
  imports: [CommonModule, FormsModule,AdminSidebarComponent],
  templateUrl: './consumed-coupons-table.component.html',
  styleUrl: './consumed-coupons-table.component.css'
})
export class ConsumedCouponsTableComponent {
  consumedCoupon: ConsumedCoupon[] = [];
  filteredConsumedCoupon: ConsumedCoupon[] = [];
  searchQuery = '';

  constructor(
    private couponService: CouponService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadConsumedCoupons();
  }

  loadConsumedCoupons(): void {
    this.couponService.getAllConsumedCoupons().subscribe({
      next: (response) => {
        this.consumedCoupon = response;
        this.filteredConsumedCoupon = response;
      },
      error: (error) => {
        console.error('Error loading consumed coupons:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consumedCoupon']) {
      this.filter();
    }
  }

  filter() {
    if (this.searchQuery === '') {
      this.filteredConsumedCoupon = this.consumedCoupon;
    } else {
      this.filteredConsumedCoupon = this.consumedCoupon.filter(consumedCoupon =>
        consumedCoupon.coupon.couponCode.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  viewConsumedcouponsetails(consumedCoupon: ConsumedCoupon) {
    this.router.navigate(['/profile', consumedCoupon.customerId]);
  }

  getConsumedCouponId(): string | null {
    return localStorage.getItem('consumedCouponId');
  }
}
