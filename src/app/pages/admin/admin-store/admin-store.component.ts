import { Component } from '@angular/core';
import {AdminStore} from '../../../dtos/store/admin-store.model';
import {NgForOf} from '@angular/common';
import {UserSidebarComponent} from '../../../components/user-sidebar/user-sidebar.component';
import {FormsModule} from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-admin-store',
  imports: [
    NgForOf,
    UserSidebarComponent,
    FormsModule
  ],
  templateUrl: './admin-store.component.html',
  styleUrl: './admin-store.component.css'
})
export class AdminStoreComponent {
  adminStores = [
    { id: 1, name: 'Store A', address: '123 Main St' },
    { id: 2, name: 'Store B', address: '456 Elm St' },
    { id: 3, name: 'Store C', address: '789 Oak St' }
  ];

  newStore = { id: 0, name: '', address: '' };
  selectedStore = { id: 0, name: '', address: '' };

  addStore() {
    if (this.newStore.name.trim() && this.newStore.address.trim()) {
      this.newStore.id = this.adminStores.length + 1;
      this.adminStores.push({ ...this.newStore });

      this.newStore = { id: 0, name: '', address: '' };
      this.closeModal('addStoreModal');
    }
  }

  openEditModal(store: any) {
    this.selectedStore = { ...store };

    // Open edit modal
    const modalElement = document.getElementById('editStoreModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }

    console.log(store);
  }

  updateStore() {
    const index = this.adminStores.findIndex(s => s.id === this.selectedStore.id);
    if (index !== -1) {
      this.adminStores[index] = { ...this.selectedStore };
    }

    this.closeModal('editStoreModal');
  }

  deleteStore(id: number) {
    if (confirm('Are you sure you want to delete this store?')) {
      this.adminStores = this.adminStores.filter(store => store.id !== id);
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
}
