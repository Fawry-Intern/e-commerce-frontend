import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-navebare',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-navebare.component.html',
  styleUrls: ['./customer-navebare.component.css']
})
export class CustomerNavebareComponent implements OnInit {
  @Output() searchTextChanged = new EventEmitter<string>();
  userFirstName: string | null = null;
  isLoggedIn: boolean = false;
  userId: number = 0;
  @Input() hideSearch: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.userFirstName = user?.firstName?.toString() ?? 'User';
        this.userId = Number(user?.id) ?? 0;
      },
      error: (err) => {
        console.error("Failed to load user:", err);
        // Handle error appropriately
      }
    });
  }

  onStoreClick(): void {
    this.router.navigate(['/customer/stores']);
  }

  onSignOut(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onSearch(value: string): void {
    this.searchTextChanged.emit(value.trim());
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTextChanged.emit(value.trim());
  }

  onCartClick(): void {
    this.router.navigate(['/customer/order']);
  }

  onProfileClick(): void {
    if (this.isLoggedIn && this.userId) {
      this.router.navigate(['/profile', this.userId]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
