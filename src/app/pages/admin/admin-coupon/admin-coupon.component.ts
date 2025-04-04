import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { CouponService } from '../../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateCouponRequest } from '../../../dtos/coupons/create-coupon-request';
import { Router } from '@angular/router';
import { Coupon } from '../../../models/coupon/coupon.model';
import { CouponTableComponent } from '../../../components/coupon-table/coupon-table.component';
import { ConsumedCouponsTableComponent } from '../consumed-coupons-table/consumed-coupons-table.component';

@Component({
  selector: 'app-admin-coupon',
  standalone: true, 
  imports: [ConsumedCouponsTableComponent,AdminSidebarComponent, CouponTableComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent implements OnInit {
  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];
  loading = false;
  error: string | null = null;
  searchQuery: string = '';
  
  couponForm: FormGroup = new FormGroup({
    couponCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    usageLimit: new FormControl(1, [Validators.required, Validators.min(1)]),
    expiryDate: new FormControl(null, Validators.required),
    discountType: new FormControl('', Validators.required),
    discountValue: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });

  discountTypes: string[] = ['PERCENTAGE', 'FIXED_AMOUNT'];
  fieldErrors: { [key: string]: string } = {};

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.error = null;
    
    this.couponService.getAllCoupons().subscribe({
      next: (response) => {
        this.coupons = response;
        this.filteredCoupons = response;
      },
      error: (error) => {
        console.error('Error loading coupons:', error);
        this.error = 'Failed to load coupons. Please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.couponForm.invalid) {
      this.displayValidationErrors();
      return;
    }

    

    const formData: CreateCouponRequest = {
      couponCode: this.couponForm.get('couponCode')?.value.trim() || '',
      discountType: this.couponForm.get('discountType')?.value || '',
      discountValue: this.couponForm.get('discountValue')?.value ?? 0,
      expiryDate: this.parseDate(this.couponForm.get('expiryDate')?.value),
      usageLimit: this.couponForm.get('usageLimit')?.value ?? 1
    };

    this.couponService.createCoupon(formData).subscribe({
      next: () => {
        alert('Coupon Created Successfully!');
        this.resetForm();
        this.loadCoupons();
      },
      error: (err) => {
        console.error('Creation failed:', err);
        alert(`Creation failed: ${err.message || 'Unknown error'}`);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  filterCoupons(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCoupons = this.coupons;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredCoupons = this.coupons.filter(coupon => 
      coupon.couponCode.toLowerCase().includes(query)
    );
  }

  viewAllCoupons(): void {
    const couponsSection = document.querySelector('.coupons-table-section');
    if (couponsSection) {
      couponsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  viewAllCouponConsumptions(): void {
    const couponsSection = document.querySelector('.coupons-counsumptions-table');
    if (couponsSection) {
      couponsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getActiveCouponsCount(): number {
    return this.coupons.filter(coupon => coupon.isActive).length;
  }

  private parseDate(dateString: string | null): Date {
    return dateString ? new Date(dateString) : new Date();
  }

  private displayValidationErrors(): void {
    Object.keys(this.couponForm.controls).forEach(field => {
      const control = this.couponForm.get(field);
      if (control?.invalid) {
        this.fieldErrors[field] = 'This field is required or invalid';
      }
    });
    alert('Please fill in all required fields correctly.');
  }

  private resetForm(): void {
    this.couponForm.reset({ usageLimit: 1, discountValue: 0, expiryDate: null });
  }
  createCoupon(): void {
    const couponsSection = document.querySelector('.create-coupon-section');
    if (couponsSection) {
      couponsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
