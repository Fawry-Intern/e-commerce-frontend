import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-navebare',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-navebare.component.html',
  styleUrl: './customer-navebare.component.css'
})
export class CustomerNavebareComponent {
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
    this.router.navigate(['/customer/stores']);
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
