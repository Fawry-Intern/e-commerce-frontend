export interface Coupon {
  id: number; // Long is equivalent to number in TypeScript
  usageLimit: number; // Integer is equivalent to number
  expiryDate: string | null; // Instant is equivalent to a string (ISO 8601 format) or null
  couponCode: string;
  discountType: string; // Enum can be represented as a string
  discountValue: number; // BigDecimal is equivalent to number
  isActive?: boolean; // Optional field (because it's not required in all cases)
  timesUsed?: number; // Optional field
}
