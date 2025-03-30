import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(
    private router: Router
  ) {
   
  }

  goToAdminDashboard() {
    this.router.navigate(['admin-dashboard']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goToActiveAccounts() {
    this.router.navigate(['active-account']);
  }

  goToBlockedAccounts() {
    this.router.navigate(['un-active-account']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
