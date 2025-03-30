import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { AdminSidebarComponent } from "../../../components/admin-sidebar/admin-sidebar.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
