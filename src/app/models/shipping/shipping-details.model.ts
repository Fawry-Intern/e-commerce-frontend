
import { ShippingStatus } from "../../enums/shipping-status.model"
import { CustomerDetails } from "../user/customer-details.model"
import { DeliveryPersonDetails } from "../user/delivery-person-details.model"

export interface ShippingDetails{

    shipmentId:Number,
    orderId:Number,
    customerDetails:CustomerDetails,
    deliveryPerson:DeliveryPersonDetails|null,
    status:ShippingStatus,
    deliveredAt:Date,
    expectedDeliveryDate:Date
    
}
