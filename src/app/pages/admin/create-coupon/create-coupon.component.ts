import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CouponService } from '../../../services/coupon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-coupon',
  imports: [ReactiveFormsModule, CommonModule], // ✅ Import ReactiveFormsModule
  templateUrl: './create-coupon.component.html',
  styleUrl: './create-coupon.component.css'
})
export class CreateCouponComponent {
  // ✅ Define couponForm correctly as a FormGroup
  couponForm = new FormGroup({
    couponCode: new FormControl('', Validators.required),
    usageLimit: new FormControl(1, [Validators.required, Validators.min(1)]),
    expiryDate: new FormControl('', Validators.required),
    discountType: new FormControl('', Validators.required),
    discountValue: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });

  // ✅ Define discount types correctly
  discountTypes: string[] = ['Percentage', 'Fixed Amount'];

  fieldErrors: { [key: string]: string } = {};  

  constructor(private couponService: CouponService, private router: Router) {}

  onSubmit() {
    if (this.couponForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const formData = {
      code: this.couponForm.get('couponCode')?.value || '',
      discountType: this.couponForm.get('discountType')?.value || '',
      discountAmount: this.couponForm.get('discountValue')?.value ?? 0,
      expiryDate: this.couponForm.get('expiryDate')?.value || new Date(),
      usageLimit: this.couponForm.get('usageLimit')?.value ?? 1,
    };

    this.couponService.createCoupon(formData).subscribe({
      next: (response) => {
        console.log('Coupon Created:', response);
        alert('Coupon Created Successfully!');
      },
      error: (err) => {
        console.error('Creation failed:', err);
        this.fieldErrors['general'] = 'Creation failed. Please try again.';
      }
    });
  }
}
