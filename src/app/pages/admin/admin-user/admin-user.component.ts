import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { DeliverySidebarComponent } from '../../../components/delivery-sidebar/delivery-sidebar.component';

@Component({
  selector: 'app-admin-user',
  imports: [AdminSidebarComponent,UserSidebarComponent,DeliverySidebarComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {

}
