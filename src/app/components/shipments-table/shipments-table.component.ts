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
  @Input() shippings: ShippingDetails[] = [];
  filteredShippings: ShippingDetails[] = [];
  
  selectedShipping: any;

  constructor(
    private shippingService: ShippingService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shippings']) {
      console.log(this.filteredShippings+' from shipping table')
      this.filteredShippings=this.shippings;
    }
  }

  getDeliveredShippingsCount(): number {
    return this.filteredShippings.filter(shipping => shipping.status===ShippingStatus.DELIVERED).length;
  }
  getCancelledShippingsCount(): number {
    return this.filteredShippings.filter(shipping => shipping.status===ShippingStatus.CANCELLED).length;
  }


  
  changeShippingStatus(shipping: ShippingDetails) {

 
    if (shipping.status === ShippingStatus.RECEIVED) {
      console.log('entered received ')
      this.shippingService.processShipment(shipping.shipmentId).subscribe({
        next: (response) => {
          shipping.status = ShippingStatus.PROCESSED;
        },
        error: (error) => {
          console.error('Error proceeding from received to processed :', error);
        }
      });
    } else  if (shipping.status === ShippingStatus.PROCESSED){
      console.log('entered processed')
      this.shippingService.shipShipment(shipping.shipmentId).subscribe({
        next: (response) => {
          shipping.status=ShippingStatus.SHIPPED;
          shipping.deliveryPerson=response.deliveryPerson;
          console.log(response);
        },
        error: (error) => {
          console.error('Error proceeding from processed to shipped:', error);
        }
      });
    }

  
  }

  selectShipping(shipping:any){

    this.selectedShipping = shipping ;
    console.log(shipping);
  }
 

}
