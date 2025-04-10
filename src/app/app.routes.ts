import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDeliveryComponent } from './pages/admin/admin-delivery/admin-delivery.component';
import { AdminCouponComponent } from './pages/admin/admin-coupon/admin-coupon.component';
import { ConsumedCouponsTableComponent } from './pages/admin/consumed-coupons-table/consumed-coupons-table.component';
import { DeliveryPersonDashboardComponent } from './pages/delivery-person/delivery-person-dashboard/delivery-person-dashboard.component';
import { CustomerDeliveryComponent } from './pages/customer/customer-delivery/customer-delivery.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    
    {path:'admin/users',component:AdminUserComponent},
    {path:'admin/delivery',component:AdminDeliveryComponent},
    {path:'admin/user',component:AdminUserComponent},
    {path:'admin/coupon', component: AdminCouponComponent},
    {path: 'admin/coupon-consumptions', component: ConsumedCouponsTableComponent},
    {path:'delivery-person/dashboard',component:DeliveryPersonDashboardComponent},
    {path:'customer/order-tracking',component:CustomerDeliveryComponent},
     {path:'home', component:HomeComponent},

     {path:'profile/:id',component:ProfileComponent},
    {path:'login',component:LoginComponent},
    {path:'sign-up',component:SignUpComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {path:'**',redirectTo:'login'}
]
