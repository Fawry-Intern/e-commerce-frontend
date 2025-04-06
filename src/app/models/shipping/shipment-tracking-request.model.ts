import { ShippingStatus } from "../../enums/shipping-status.model"

export interface ShipmentTracking{
     shipmentId:Number,
     orderId:Number,
     deliveryPersonName:String,
     status:ShippingStatus,
     expectedDeliveryDate:Date
}