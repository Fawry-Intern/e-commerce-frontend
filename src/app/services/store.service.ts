import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class StoreService {
    private store: any = null; // Initialize store as null

    constructor() {
        this.loadStoreFromLocalStorage(); // Load the store from local storage on initialization
    }

    private loadStoreFromLocalStorage(): void {
        const storedData = localStorage.getItem('store');
        if (storedData) {
            this.store = JSON.parse(storedData);
        } else {
            this.store = {}; // Initialize with an empty object if no data is found
        }
    }
}