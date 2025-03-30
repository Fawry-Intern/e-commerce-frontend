import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { DeliverySidebarComponent } from '../../../components/delivery-sidebar/delivery-sidebar.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-user',
  imports: [AdminSidebarComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {

  constructor(private userService:UserService)
  {

  }


  ngOnInit():void{
   this. getAllUsers();
  }


getAllUsers(){

  this.userService.getAllUsers().subscribe((data)=>{

    console.log(data);
  })
}

}
