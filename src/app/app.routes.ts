import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDeliveryComponent } from './pages/admin/admin-delivery/admin-delivery.component';
import { AdminCouponComponent } from './pages/admin/admin-coupon/admin-coupon.component';
import { AdminStoreComponent } from "./pages/admin/admin-store/admin-store.component";

import { DeliveryPersonDashboardComponent } from './pages/delivery-person/delivery-person-dashboard/delivery-person-dashboard.component';
import { CustomerDeliveryComponent } from './pages/customer/customer-delivery/customer-delivery.component';

import { CustomerProductsComponent } from './pages/customer/customer-products/customer-products.component';
import { CustomerStoreComponent } from './pages/customer/customer-store/customer-store.component';

import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import {AdminProductComponent} from './pages/admin/admin-product/admin-product.component';
import {AdminProductsStoreComponent} from './pages/admin/admin-products-store/admin-products-store.component';
import { ConsumedCouponsTableComponent } from './pages/admin/admin-consumed-coupon/consumed-coupons-table.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


export const routes: Routes = [

    {path:'admin/users',
    component:AdminUserComponent,
     canActivate:[AuthGuard,RoleGuard],
    data:{role:'admin'}
    },

    {path:'admin/delivery',
    component:AdminDeliveryComponent,
    canActivate:[AuthGuard,RoleGuard],
    data:{role:'admin'}
     },

    {path:'admin/user',
        component:AdminUserComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },
    {path:'admin/store',
        component:AdminStoreComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },

    {path:'admin/store/:id',
        component:AdminProductsStoreComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },

    {path:'admin/product', 
        component:AdminProductComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },

    {path:'admin/coupon', 
        component: AdminCouponComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },

    {path: 'admin/coupon-consumptions', 
        component: ConsumedCouponsTableComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'admin'}
    },

    {path:'delivery-person/dashboard',
        component:DeliveryPersonDashboardComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'delivery'}
    },

    {path:'customer/order-tracking',
        component:CustomerDeliveryComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'customer'}
    },

    {path:'customer/stores/:storeId/products',
        component:CustomerProductsComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'customer'}
    },
    
    {path:'customer/stores',
        component:CustomerStoreComponent,
        canActivate:[AuthGuard,RoleGuard],
        data:{role:'customer'}
    },
     
    {path:'profile/:id',
        component:ProfileComponent,
        canActivate:[AuthGuard]
    },

    {path:'login',component:LoginComponent},
    {path:'sign-up',component:SignUpComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {path:'**',redirectTo:'login'}
]
