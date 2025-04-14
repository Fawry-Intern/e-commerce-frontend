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

  searchQuery: string = '';

  @Input() stores: AdminStore[] = [];

  filteredStores: AdminStore[] = [];
  selectedStore: AdminStore = { id: 0, name: '', address: '',imageUrl:'' };
  newStore: AdminStore = { id: 0, name: '', address: '',imageUrl:'' };

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchStores();
  }

 
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


 

  createStore(): void {
    this.newStore = { id: 0, name: '', address: '',imageUrl:'' };

    const modalElement = document.getElementById('createStoreModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  addStore(): void {
    if (this.newStore.name.trim() && this.newStore.address.trim()) {
      console.log(this.newStore);
      this.storeService.createStore(this.newStore).subscribe({
        next: (createdStore: AdminStore) => {
          this.stores.push(createdStore);
          this.filterStores();

  
        },
        error: (err: any) => {
          console.error('Error creating store:', err);
        }
      });
    }
  }

  goToStore(id:Number){
    this.router.navigate(['/admin/store',id])
  }
}
