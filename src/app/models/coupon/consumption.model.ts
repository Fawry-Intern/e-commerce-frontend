import { Coupon } from "./coupon.model";

export interface ConsumedCoupon {
    id?: number; 
    consumptionDate?: Date; 
    orderId: number;
    customerId: number;
    actualDiscount: number; 
    coupon: Coupon;
}
  