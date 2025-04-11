import { Component, Input, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { ShippingDetails } from '../../models/shipping/shipping-details.model';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';
import { ShippingStatus } from '../../enums/shipping-status.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmShipment } from '../../dtos/shipping/confirm-shipment.model';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deliveries-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deliveries-table.component.html',
  styleUrl: './deliveries-table.component.css'
})
export class DeliveriesTableComponent implements OnInit, OnDestroy {
  ShippingStatus = ShippingStatus;

  @Input() shippings: ShippingDetails[] = [];
  filteredShippings: ShippingDetails[] = [];
  selectedShipping: any;
  confirmShipment: ConfirmShipment = {
    confirmationCode: '',
    shipmentId: 0
  };
  latestNewShippingId: Number | null = null;

  private notificationSubscription?: Subscription;

  constructor(
    private shippingService: ShippingService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.openConnection();

  
    this.notificationSubscription = this.notificationService.getMessages().subscribe((newShipping: ShippingDetails) => {
      console.log('New shipping received from WebSocket:', newShipping);
      
      this.filteredShippings = [newShipping, ...this.filteredShippings];
      this.latestNewShippingId = newShipping.shipmentId;

   
      setTimeout(() => {
        this.latestNewShippingId = null;
      }, 15000);
   
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shippings']) {
      this.filteredShippings = [...this.shippings]; 
    }
  }

  ngOnDestroy(): void {

    this.notificationSubscription?.unsubscribe();
    this.notificationService.disconnect();
  }

  confirmDelivery(): void {
    this.confirmShipment.shipmentId = this.selectedShipping.shipmentId;
    this.shippingService.confirmShipment(this.confirmShipment).subscribe((data) => {
      if (data) {
        this.selectedShipping.status = ShippingStatus.DELIVERED;
      } else {
        console.log('Error occurred at delivery confirmation');
      }
    });
  }

  selectShipping(shipping: any): void {
    this.selectedShipping = shipping;
    console.log(shipping);
  }
}
