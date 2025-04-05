import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { Router } from '@angular/router';
import { Coupon } from '../../models/coupon/coupon.model';

@Component({
  selector: 'app-coupon-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coupon-table.component.html',
  styleUrls: ['./coupon-table.component.css']
})
export class CouponTableComponent {
  @Input() coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];
  searchQuery = '';

  constructor(
    private couponService: CouponService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coupons']) {
      this.filterCoupons();
    }
  }

  getActiveCouponsCount(): number {
    return this.filteredCoupons.filter(coupon => coupon.isActive).length;
  }

  getExpiredCouponsCount(): number {
    return this.filteredCoupons.filter(coupon => !coupon.isActive).length;
  }

  filterCoupons() {
    if (this.searchQuery === '') {
      this.filteredCoupons = this.coupons;
    } else {
      this.filteredCoupons = this.coupons.filter(coupon =>
        coupon.couponCode.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  toggleCouponStatus(coupon: Coupon) {
    if (coupon.isActive === true) {
      this.couponService.deactivateCoupon(coupon.couponCode).subscribe({
        next: () => {
          coupon.isActive = false;
        },
        error: (error) => {
          console.error('Error deactivating coupon:', error);
        }
      });
    } else {
      this.couponService.activateCoupon(coupon.couponCode).subscribe({
        next: () => {
          coupon.isActive = true;
        },
        error: (error) => {
          console.error('Error activating coupon:', error);
        }
      });
    }
  }

  viewCouponDetails(coupon: Coupon) {
    this.router.navigate(['/coupon-details', coupon.couponCode]);
  }

  deleteCoupon(coupon: Coupon) {
    if (confirm(`Are you sure you want to delete coupon ${coupon.couponCode}?`)) {
      this.couponService.deleteCoupon(coupon.couponCode).subscribe({
        next: () => {
          this.coupons = this.coupons.filter(c => c !== coupon);
          this.filterCoupons();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting coupon:', error);
        }
      });
    }
  }

  getCouponId(): string | null {
    return localStorage.getItem('couponId');
  }
}
