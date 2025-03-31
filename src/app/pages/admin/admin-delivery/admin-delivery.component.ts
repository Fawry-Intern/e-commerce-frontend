import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../../services/shipping.service';
import { ShippingDetails } from '../../../models/shipping/shipping-details.model';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ShipmentsTableComponent } from '../../../components/shipments-table/shipments-table.component';
import { DeliveryPersonCreationDetails } from '../../../dtos/user/delivery-person-creation-details.model';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-delivery',
  standalone: true,
  imports: [AdminSidebarComponent, ShipmentsTableComponent, FormsModule, CommonModule],
  templateUrl: './admin-delivery.component.html',
  styleUrl: './admin-delivery.component.css'
})
export class AdminDeliveryComponent implements OnInit {
  shippingDetails: ShippingDetails[] = [];
  deliveryPerson: DeliveryPersonCreationDetails = this.getEmptyDeliveryPerson();

  workDaysMap = new Map<number, string>([
    [0, 'Sunday'],
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday']
  ]);

  workDaysArray = Array.from(this.workDaysMap.entries()); // ✅ Convert to array

  constructor(private shippingService: ShippingService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  toggleWorkDay(day: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.deliveryPerson.workDays.push(day);
    } else {
      this.deliveryPerson.workDays = this.deliveryPerson.workDays.filter(d => d !== day);
    }
  }

  isWorkDaySelected(day: number): boolean {
    return this.deliveryPerson.workDays.includes(day);
  }

  loadShipments(): void {
    this.shippingService.getAllShipments().subscribe({
      next: (data) => {
        this.shippingDetails = data;
        console.log('Shipments loaded:', data);
      },
      error: (err) => console.error('Error loading shipments:', err)
    });
  }

  createDeliveryPerson(): void {
    console.log('Creating Delivery Person:', this.deliveryPerson);
    
    this.userService.createDeliveryPerson(this.deliveryPerson).subscribe({
      next: (data) => {
        console.log('Delivery person created:', data);
        alert('Delivery person added successfully!');
        this.deliveryPerson = this.getEmptyDeliveryPerson(); // ✅ Reset form
      },
      error: (err) => console.error('Error creating delivery person:', err)
    });
  }

  private getEmptyDeliveryPerson(): DeliveryPersonCreationDetails {
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      workDays: []
    };
  }
}
