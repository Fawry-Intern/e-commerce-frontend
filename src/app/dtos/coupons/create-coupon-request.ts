export interface CreateCouponRequest{
    code: string;
    discountType: string;
    discountAmount: number;
    expiryDate: Date;
    usageLimit: number;
}