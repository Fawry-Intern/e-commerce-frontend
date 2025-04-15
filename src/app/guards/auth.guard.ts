import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
} 