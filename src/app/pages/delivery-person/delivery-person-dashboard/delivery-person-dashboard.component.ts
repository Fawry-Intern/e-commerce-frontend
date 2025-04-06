import { Component } from '@angular/core';
import { DeliverySidebarComponent } from '../../../components/delivery-sidebar/delivery-sidebar.component';
import { ShippingService } from '../../../services/shipping.service';
import { ShippingDetails } from '../../../models/shipping/shipping-details.model';
import { ShipmentsTableComponent } from '../../../components/shipments-table/shipments-table.component';
import { DeliveriesTableComponent } from "../../../components/deliveries-table/deliveries-table.component";

@Component({
  selector: 'app-delivery-person-dashboard',
  imports: [DeliverySidebarComponent, ShipmentsTableComponent, DeliveriesTableComponent],
  templateUrl: './delivery-person-dashboard.component.html',
  styleUrl: './delivery-person-dashboard.component.css'
})
export class DeliveryPersonDashboardComponent {

         shippingDetails:ShippingDetails[]=[];
         email:String='';
     constructor(private shippingService:ShippingService){
    
     }

    ngOnInit(){
      const storedEmail = localStorage.getItem('email');
      this.email = storedEmail ? storedEmail : '';
       
               this.getDeliveryListByEmail(this.email);
    }

    getDeliveryListByEmail(email:String){

      this.shippingService.getDeliveryListByEmail(email).subscribe((data)=>{
        this.shippingDetails=data;
      })
    }


}
