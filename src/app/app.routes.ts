import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDeliveryComponent } from './pages/admin/admin-delivery/admin-delivery.component';
import { CreateCouponComponent } from './pages/admin/create-coupon/create-coupon.component';

export const routes: Routes = [
    
    {path:'admin/users',component:AdminUserComponent},
    {path:'admin/delivery',component:AdminDeliveryComponent},

     {path:'profile/:id',component:ProfileComponent},
    {path:'login',component:LoginComponent},
    {path:'sign-up',component:SignUpComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'admin/user',component:AdminUserComponent},
    {path:'coupon', component: CreateCouponComponent},
    {path:'**',redirectTo:'login'}
]
