import { AddressDetails } from "../user/address-details.model"
import { OrderItem } from "./order-item.model"
import { PaymentMethod } from "./payment-method.model"

export interface OrderRequest{
    customerName:String,

     customerContact:String,

    addressDetails:AddressDetails,

    totalAmount:number,

    couponCode:String,

    orderItems:OrderItem[], 
  
    paymentMethod:PaymentMethod
}