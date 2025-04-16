import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Store } from '../../../models/store/store.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CardStoreComponent } from '../../../components/card-store/card-store.component';
import { CustomerNavebareComponent } from '../../../components/customer-navebare/customer-navebare.component';

@Component({
  selector: 'app-customer-store',
  imports: [CommonModule,RouterModule, CardStoreComponent,CustomerNavebareComponent],
  templateUrl: './customer-store.component.html',
  styleUrl: './customer-store.component.css'
})
export class CustomerStoreComponent {
  stores: Store[] = [];
  error: string | null = null;
  filteredStores: Store[] = [];
  constructor(private storeService:StoreService, private router:Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.loadStores();
    this.activatedRoute.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        (document.getElementById('searchInput') as HTMLInputElement).value = searchTerm;
        this.handleSearch(searchTerm); 
      }
    });
  }

  loadStores(): void {
    this.storeService.getAllStores().subscribe({
      next: (response) => {
        this.stores = response;
        console.log('Stores loaded:', this.stores);
        this.filteredStores = this.stores;
      },
      error: (error) => { 
        console.error('Error loading stores:', error);
      }
    });
    
  }
  handleSearch(searchText: string): void {
    if (!searchText) {
      this.filteredStores = this.stores;
    } else {
      this.filteredStores = this.stores.filter(store =>
        store.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  onStoreClick(storeId: number) {
    console.log("Store ID clicked:", storeId); 
    this.router.navigate([`/customer/stores/${storeId}/products`]);
  }
}
