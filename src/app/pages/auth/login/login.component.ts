import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest } from '../../../dtos/user/auth-request.model';
import { AuthService } from '../../../services/auth.service';
import { AuthDetails } from '../../../models/auth-details.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthRequest = {
    email: '',
    password: ''
};
userId: number = 0;
fieldErrors: { [key: string]: string } = {};

constructor(private authService: AuthService, private route: Router) {localStorage.clear();}

onSubmit() {
   
    this.fieldErrors = {};
    
    this.authService.authenticate(this.authRequest).subscribe({
        next: (response: AuthDetails) => {
            console.log('Login successful:', response);
   
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('role', response.role.toLowerCase());

            if (response.role.toLowerCase() === 'admin') {
                this.route.navigate(['/admin/users']);
            } 
            else if(response.role.toLowerCase()==='customer')
            {
              this.route.navigate(['/customer/stores']);
            }
            else{
                localStorage.setItem('email',response.email.toLowerCase());
                
              this.route.navigate(['delivery-person/dashboard']);
            }
        },
        error: (err) => {
            console.error('Login failed:', err);
            this.fieldErrors['password'] = "Invalid email or password. Please try again.";
        }
    });
}

}
