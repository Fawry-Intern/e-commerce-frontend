import { Component, Input, SimpleChanges } from '@angular/core';
import { ShippingDetails } from '../../models/shipping/shipping-details.model';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';
import { ShippingStatus } from '../../enums/shipping-status.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shipments-table',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './shipments-table.component.html',
  styleUrl: './shipments-table.component.css'
})
export class ShipmentsTableComponent {

  ShippingStatus = ShippingStatus; 
  @Input() orders: ShippingDetails[] = [];
  filteredShippings: ShippingDetails[] = [];
  
  constructor(
    private shippingService: ShippingService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.filteredShippings=this.orders;
    }
  }

  getDeliveredOrdersCount(): number {
    return this.filteredShippings.filter(order => order.status===ShippingStatus.DELIVERED).length;
  }
  getCancelledOrdersCount(): number {
    return this.filteredShippings.filter(order => order.status===ShippingStatus.CANCELLED).length;
  }


  
  changeOrderStatus(order: ShippingDetails) {

 
    if (order.status === ShippingStatus.RECEIVED) {
      console.log('entered received ')
      this.shippingService.processShipment(order.shipmentId).subscribe({
        next: (response) => {
          order.status = ShippingStatus.PROCESSED;
        },
        error: (error) => {
          console.error('Error proceeding from received to processed :', error);
        }
      });
    } else  if (order.status === ShippingStatus.PROCESSED){
      console.log('entered processed')
      this.shippingService.shipShipment(order.shipmentId).subscribe({
        next: (response) => {
          order.status=ShippingStatus.SHIPPED;
          order.deliveryPerson=response.deliveryPerson;
          console.log(response);
        },
        error: (error) => {
          console.error('Error proceeding from processed to shipped:', error);
        }
      });
    }
  }

 

}
