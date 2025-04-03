export interface CreateCouponRequest {
    couponCode: string;
    discountType: string;
    discountValue: number;
    expiryDate: Date; // ✅ Accepts both string and Date for flexibility
    usageLimit: number;
  }
  