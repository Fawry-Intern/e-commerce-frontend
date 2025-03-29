import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { AdminSidebarComponent } from "../../../components/admin-sidebar/admin-sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../dtos/user/register-request.model';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  standalone:true,
  imports: [RouterLink,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registerRequest: RegisterRequest = {
    userName:'',
    email: '',
    password: ''
  };
  fieldErrors: { [key: string]: string } = {};  

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
  
        this.fieldErrors = {};
      
        alert('Registration successful! Please log in.');
      
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        if (err.error?.fieldErrors) {
          this.fieldErrors = err.error.fieldErrors;
        } else {
          this.fieldErrors['general'] = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
