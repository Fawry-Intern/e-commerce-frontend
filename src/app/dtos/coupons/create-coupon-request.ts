export interface CreateCouponRequest {
    code: string;
    discountType: string;
    discountAmount: number;
    expiryDate: string | Date; // ✅ Accepts both string and Date for flexibility
    usageLimit: number;
  }
  