import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const userRole = localStorage.getItem('role');
    const requiredRole = route.data['role'];

    
    if (userRole === requiredRole) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
} 