import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-sidebar',
  templateUrl: './delivery-sidebar.component.html',
  styleUrls: ['./delivery-sidebar.component.css']
})
export class DeliverySidebarComponent {
  userRole: string = 'Delivery Profile';
  @Input() userAvatar: string = 'assets/images/default-avatar.png';

  constructor(public router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default/delivery-avatar.png';
  }
}
