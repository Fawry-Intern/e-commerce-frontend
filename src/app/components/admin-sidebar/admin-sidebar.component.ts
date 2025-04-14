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

  viewCoupons() {
    this.router.navigate(['/admin/coupon']);
  }

  viewCouponConsumptions() {
    this.router.navigate(['/admin/coupon-consumptions']);
  }
viewUsers(){
  this.router.navigate(['/admin/user']);
}
viewStores(){
     this.router.navigate(['/admin/store']);
}

viewProducts(){
  this.router.navigate(['/admin/product']);
}
viewShipping(){
  this.router.navigate(['/admin/delivery']);
}
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
