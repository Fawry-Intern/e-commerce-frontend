import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-product-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-product-navbar.component.html',
  styleUrl: './customer-product-navbar.component.css'
})
export class CustomerProductNavbarComponent {
  @Output() searchTextChanged = new EventEmitter<string>();
  userFirstName: string | null = null;
  isLoggedIn: boolean = false;
  userId: number = 0;
  constructor(private authService: AuthService, private router: Router) {} 

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
      if (this.isLoggedIn) {
        this.authService.getLoggedInUser().subscribe({
          next: (user) => {
            this.userFirstName = user?.firstName?.toString() ?? 'User';
            this.userId = Number(user?.id) ?? 0;
          },
          error: (err) => console.error("Failed to load user:", err)
        });
      }
  }

  onStoreClick() {
    this.router.navigate(['/customer/products']);
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onSearch(value: string) {
    console.log("Search text1:", value);
    this.searchTextChanged.emit(value.trim());
  }
}