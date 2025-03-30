import { Component } from '@angular/core';
import { ShippingService } from '../../../services/shipping.service';
import { ShippingDetails } from '../../../models/shipping/shipping-details.model';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ShipmentsTableComponent } from '../../../components/shipments-table/shipments-table.component';

@Component({
  selector: 'app-admin-delivery',
  imports: [AdminSidebarComponent,ShipmentsTableComponent],
  templateUrl: './admin-delivery.component.html',
  styleUrl: './admin-delivery.component.css'
})
export class AdminDeliveryComponent {

shippingDetails:ShippingDetails[]=[];
constructor(private shippingService:ShippingService)
{

}

ngOnInit():void{

  this.getAllShipments();
}
getAllShipments()
{

     this.shippingService.getAllShipments().subscribe((data)=>{
      this.shippingDetails=data;
      console.log(data);
     })
}


}
