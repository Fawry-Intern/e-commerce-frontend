import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequest } from "../dtos/user/register-request.model";
import { UserDetails } from "../models/user/user-details.model";
import { catchError, Observable, of } from "rxjs";
import { AuthRequest } from "../dtos/user/auth-request.model";

import { PasswordResetRequest } from "../dtos/user/password-reset-request.model";
import { AuthDetails } from "../models/auth-details.model";
import { environment } from "../../environments/environment";
import { UserService } from "./user.service";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private apiUrl = `${environment.apiUrl}/auth`;


    constructor(private httpClient: HttpClient, private userService: UserService)
    {
                               
    }
    register(registerRequest: RegisterRequest): Observable<String> {
        return this.httpClient
          .post<String>(`${this.apiUrl}/sign-up`, registerRequest)
          .pipe(
            catchError((error) => {
              console.error('Sign-up failed', error);
              throw error; 
            })
          );
      }
        
        authenticate(authRequest: AuthRequest): Observable<AuthDetails> {
            return this.httpClient
              .post<AuthDetails>(`${this.apiUrl}/login`,authRequest )
              .pipe(
                catchError((error) => {
                  console.error('Login failed', error);
                  throw error;
                })
              );
          }

    logout(): void {
        localStorage.clear();
    }

    forgotPassword(email: string): Observable<string> {
        return this.httpClient.post(`${this.apiUrl}/reset-password-request`, { email }, { responseType: 'text' });
    }

    resetPassword(request: PasswordResetRequest): Observable< String > {
      return this.httpClient.put< String >(
        `${this.apiUrl}/reset-password`, 
        request
      );
    }


    getLoggedInUser(): Observable<UserDetails> {
      const userId = localStorage.getItem('userId');
      if (this.isLoggedIn() && userId) {
        if(localStorage.getItem('userDetails')!=null)
        {
          const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}') as UserDetails;
          return of(userDetails); // Return the cached user details
        }
        return this.userService.getUserProfile(Number(userId));
      } else {
        return of(null as unknown as UserDetails); // or throw an error if preferred
      }
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('accessToken');
        return !!token; 
    }


}