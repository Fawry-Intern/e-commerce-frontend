import {Component, Input} from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { AdminStore } from '../../../dtos/store/admin-store.model';
import {StoresTableComponent} from '../../../components/stores-table/stores-table.component';

interface Activity {
  type: 'store' | 'system';
  title: string;
  time: Date;
  icon?: string;
}

@Component({
  selector: 'app-admin-store',
  standalone: true,
  imports: [AdminSidebarComponent, StoresTableComponent, CommonModule, FormsModule],
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.css']
})
export class AdminStoreComponent {
  stores: any[] = [];
  filteredStores: AdminStore[] = [];
  recentActivities: Activity[] = [];
  loading = false;
  error: string | null = null;
  searchQuery: string = '';

  constructor(
    private storeService: StoreService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStores();
    this.loadRecentActivities();
  }

  getAllStores(): void {
    this.loading = true;
    this.error = null;
    this.storeService.getAllStores().subscribe({
      next: (response: AdminStore[]) => {
        this.stores = response;
        this.filteredStores = response;
        this.loading = false;
        console.log(response);
        this.updateRecentActivities();
      },
      error: (error) => {
        console.error('Error loading stores:', error);
        this.error = 'Failed to load stores. Please try again.';
        this.loading = false;
      }
    });
  }

  updateRecentActivities(): void {
    // Take the most recent stores by sorting on id (assuming higher id = more recent)
    const recentStores = [...this.stores]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    const activities: Activity[] = [];

    recentStores.forEach(store => {
      activities.push({
        type: 'store',
        title: `New store registration: ${store.name}`,
        time: new Date(), // In a real app, use the store's registration date if available
        icon: 'fa-store'
      });
    });

    // Add a system activity as an example
    activities.push({
      type: 'system',
      title: 'System Status: Online',
      time: new Date(),
      icon: 'fa-server'
    });

    this.recentActivities = activities;
  }

  loadRecentActivities(): void {
    if (this.stores.length > 0) {
      this.updateRecentActivities();
    }
  }

  filterStores(): void {
    if (!this.searchQuery.trim()) {
      this.filteredStores = this.stores;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredStores = this.stores.filter(store =>
      store.name.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query) ||
      store.id.toString().includes(query)
    );
  }

  viewAllStores(): void {
    const storesSection = document.querySelector('.stores-table-section');
    if (storesSection) {
      storesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
