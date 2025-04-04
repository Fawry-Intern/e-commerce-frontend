import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  userId:Number=0;
  constructor(
    private router: Router
  ) {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
  }

  viewMyProfile() {

      this.router.navigate(['/profile',this.userId]);
    }

  viewcoupon() {
    this.router.navigate(['/admin/coupon']);
  }

  viewcouponConsumptions() {
    this.router.navigate(['/admin/coupon-consumptions']);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
