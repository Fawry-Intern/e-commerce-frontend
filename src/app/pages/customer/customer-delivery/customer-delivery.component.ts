import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CustomerSidebarComponent } from "../../../components/customer-sidebar/customer-sidebar.component";
import { ShippingService } from '../../../services/shipping.service';
import { ActivatedRoute } from '@angular/router';

import { ShipmentTracking } from '../../../models/shipping/shipment-tracking-request.model';
import { ShippingStatus } from '../../../enums/shipping-status.model';

@Component({
  selector: 'app-customer-delivery',
  imports: [CommonModule, CustomerSidebarComponent],
  templateUrl: './customer-delivery.component.html',
  styleUrl: './customer-delivery.component.css'
})
export class CustomerDeliveryComponent {
  ShippingStatus=ShippingStatus;
  steps = ['Received', 'Processed', 'Shipped', 'Delivered', 'Cancelled'];
  currentStepIndex = -1; 
  token:String='';
  shipmentTracking:ShipmentTracking={
    shipmentId: 0,
    orderId: 0,
    deliveryPersonName:'',
    status: ShippingStatus.RECEIVED,
    expectedDeliveryDate: new Date()
  }

  constructor(private shippingService:ShippingService,private route:ActivatedRoute)
  {
    
  }


  ngOnInit():void{
    this.route.queryParams.subscribe((params)=>{
       this.token=params['token'];
       if(!this.token){
        //todo: go to stores 
       }
    
    })
    this.getShipmentTrackingDetails();

  }

  getShipmentTrackingDetails(){
    this.shippingService.trackShipment(this.token).subscribe((data) => {
      this.shipmentTracking = data;
      
      switch (this.shipmentTracking.status) {
        case ShippingStatus.RECEIVED:
          this.currentStepIndex = 0;
          break;
        case ShippingStatus.PROCESSED:
          this.currentStepIndex = 1;
          break;
        case ShippingStatus.SHIPPED:
          this.currentStepIndex = 2;
          break;
        case ShippingStatus.DELIVERED:
          this.currentStepIndex = 3;
          break;
        case ShippingStatus.CANCELLED:
          this.currentStepIndex = 4;
          break;
        default:
          this.currentStepIndex = -1;
          break;
      }
    });
    
  }
  cancelShipment(){
   this.shippingService.cancelShipment(this.shipmentTracking.shipmentId).subscribe((data)=>{
    console.log('shipment was cancelled');
    this.shipmentTracking.status = ShippingStatus.CANCELLED;
    this.currentStepIndex = 4;
   })
  }
  
}
