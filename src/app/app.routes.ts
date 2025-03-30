import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'sign-up',component:SignUpComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'admin/user',component:AdminUserComponent},
    {path:'**',redirectTo:'login'}
];
