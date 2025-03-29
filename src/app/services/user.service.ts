import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserDetails } from "../models/user/user-details.model";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserService{
  
    private apiUrl = `${environment.apiUrl}/user`;
    private headers: HttpHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient) {
        this.updateHeaders();
    }

    private updateHeaders(): void {
        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        });
    }

    getUserProfile(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails>(`${this.apiUrl}/${userId}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting user details failed:', error);
                throw error;
            })
        );
    }

    getAllUsers(): Observable<UserDetails[]> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails[]>(`${this.apiUrl}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting all users failed:', error);
                throw error;
            })
        );
    }


    activateUser(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.put<UserDetails>(`${this.apiUrl}/activate/${userId}`, [], { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Activating user failed:', error);
                throw error;
            })
        );
    }

    deactivateUser(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.put<UserDetails>(`${this.apiUrl}/deactivate/${userId}`, [], { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Deactivating user failed:', error);
                throw error;
            })
        );
    }
}