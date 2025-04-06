import { Component, Input, SimpleChanges } from '@angular/core';
import { ShippingDetails } from '../../models/shipping/shipping-details.model';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';
import { ShippingStatus } from '../../enums/shipping-status.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmShipment } from '../../dtos/shipping/confirm-shipment.model';

@Component({
  selector: 'app-deliveries-table',
  imports: [FormsModule,CommonModule],
  templateUrl: './deliveries-table.component.html',
  styleUrl: './deliveries-table.component.css'
})
export class DeliveriesTableComponent {
ShippingStatus = ShippingStatus; 
  @Input() shippings: ShippingDetails[] = [];
  filteredShippings: ShippingDetails[] = [];
  selectedShipping: any;
  confirmShipment: ConfirmShipment = {
    confirmationCode: '',
    shipmentId: 0
  };

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

  
  confirmDelivery() {
         
         this.confirmShipment.shipmentId=this.selectedShipping.shipmentId; 
         this.shippingService.confirmShipment(this.confirmShipment).subscribe((data)=>{
          if(data)
          {
            this.selectedShipping.status=ShippingStatus.DELIVERED;
          }
          else{
            console.log('error occurred at delivery confirmation')
          }
         })
  
  }

  selectShipping(shipping:any){

    this.selectedShipping = shipping ;

    console.log(shipping);
  }
 

}
