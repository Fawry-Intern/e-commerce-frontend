import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminStore } from '../../dtos/store/admin-store.model';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-stores-table',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './stores-table.component.html',
  styleUrls: ['./stores-table.component.css']
})
export class StoresTableComponent implements OnInit {
  // Search query for filtering stores
  searchQuery: string = '';
  // Full list of stores fetched from the service
  @Input() stores: AdminStore[] = [];
  // List of stores displayed after filtering
  filteredStores: AdminStore[] = [];
  selectedStore: AdminStore = { id: 0, name: '', address: '' };

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchStores();
  }

  // Fetch stores from the backend via the service
  fetchStores(): void {
    this.storeService.getAllStores().subscribe({
      next: (stores: AdminStore[]) => {
        this.stores = stores;
        this.filteredStores = stores;
      },
      error: (err: any) => {
        console.error('Error fetching stores:', err);
      }
    });
  }

  // Filter stores based on the search query.
  filterStores(): void {
    if (!this.searchQuery) {
      this.filteredStores = this.stores;
      return;
    }
    console.log(this.searchQuery);
    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredStores = this.stores.filter((store: AdminStore) =>
      store.name.toLowerCase().includes(lowerQuery)
    );
    console.log(this.filteredStores);
  }

  // Navigate to a detailed view for a store.
  viewStoreDetails(store: AdminStore): void {

    this.selectedStore = { ...store };

    const modalElement = document.getElementById('storeDetailsModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  // Delete a store after confirmation.
  deleteStore(store: AdminStore): void {
    if (confirm(`Are you sure you want to delete the store "${store.name}"?`)) {
      this.storeService.deleteStore(store.id).subscribe({
        next: () => {
          // Remove the deleted store from the local list and reapply filter.
          this.stores = this.stores.filter(s => s.id !== store.id);
          this.filterStores();
        },
        error: (err: any) => {
          console.error('Error deleting store:', err);
        }
      });
    }
  }
}
