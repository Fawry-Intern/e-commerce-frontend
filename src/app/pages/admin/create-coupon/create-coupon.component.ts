import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CouponService } from '../../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { CreateCouponRequest } from '../../../dtos/coupons/create-coupon-request';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-create-coupon',
  imports: [ReactiveFormsModule, CommonModule, AdminSidebarComponent], // ✅ Import ReactiveFormsModule
  templateUrl: './create-coupon.component.html',
  styleUrl: './create-coupon.component.css'
})
export class CreateCouponComponent {
  loading = false;
  // ✅ Define couponForm correctly as a FormGroup
  couponForm = new FormGroup({
    couponCode: new FormControl('', Validators.required),
    usageLimit: new FormControl(1, [Validators.required, Validators.min(1)]),
    expiryDate: new FormControl('', Validators.required),
    discountType: new FormControl('', Validators.required),
    discountValue: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });

  // ✅ Define discount types correctly
  discountTypes: string[] = ['PERCENTAGE', 'FIXED_AMOUNT'];

  fieldErrors: { [key: string]: string } = {};  

  constructor(private couponService: CouponService, private router: Router) {}

  onSubmit() {
    this.loading = true; // Start loading
    if (this.couponForm.invalid) {
      alert('Please fill in all required fields correctly.');
      this.loading = false;
      return;
    }
  
    const formData: CreateCouponRequest = {
      couponCode: this.couponForm.get('couponCode')?.value?.trim() || '',
      discountType: this.couponForm.get('discountType')?.value || '',
      discountValue: this.couponForm.get('discountValue')?.value ?? 0,
      expiryDate: this.couponForm.get('expiryDate')?.value 
        ? new Date(this.couponForm.get('expiryDate')?.value as string) 
        : new Date(),
      usageLimit: this.couponForm.get('usageLimit')?.value ?? 1,
    };
  
    this.couponService.createCoupon(formData).subscribe({
      next: (response) => {
        console.log('Coupon Created:', response);
        alert('Coupon Created Successfully!');
        this.couponForm.reset(); // Reset form
        this.router.navigate(['/admin/coupons']); // Navigate to coupons page (optional)
      },
      error: (err) => {
        this.loading = false;
        console.error('Creation failed:', err);
        alert('Creation failed: ' + err);
      },
      complete: () => {
        this.loading = false; // Stop loading after request completes
      }
    });
  }
  
  
  
}
