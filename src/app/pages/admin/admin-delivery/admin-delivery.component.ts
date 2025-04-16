import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../../services/shipping.service';
import { ShippingDetails } from '../../../models/shipping/shipping-details.model';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { ShipmentsTableComponent } from '../../../components/shipments-table/shipments-table.component';
import { DeliveryPersonCreationDetails } from '../../../dtos/user/delivery-person-creation-details.model';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

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

  currentPage = -1;
  totalPages = 0;
  pageSize = 10;

  workDaysMap = new Map<number, string>([
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday'],
    [7, 'Sunday']
  ]);

  workDaysArray = Array.from(this.workDaysMap.entries());

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
    this.nextPage()
    this.shippingService.getAllShipments(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.shippingDetails = [...this.shippingDetails, ...res.content];
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        console.log('Shipments loaded:', res);
      },
      error: (err) => console.error('Error loading shipments:', err)
    });
  }

  nextPage(): Number {
   
      this.currentPage++;
      return this.currentPage ;
    
  }



  createDeliveryPerson(): void {
    console.log('Creating Delivery Person:', this.deliveryPerson);

    this.userService.createDeliveryPerson(this.deliveryPerson).subscribe({
      next: (data) => {
        console.log('Delivery person created:', data);
        alert('Delivery person added successfully!');
        this.deliveryPerson = this.getEmptyDeliveryPerson();
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
