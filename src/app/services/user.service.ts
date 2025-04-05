import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserDetails } from "../models/user/user-details.model";
import { catchError, Observable } from "rxjs";
import { PasswordChangeRequest } from "../dtos/user/password-change-request.model";
import { DeliveryPersonCreationDetails } from "../dtos/user/delivery-person-creation-details.model";

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


    changeUserPassword(passwordChangeRequest:PasswordChangeRequest):Observable<Number>
    {
        this.updateHeaders();

  return this.httpClient.put<Number>(`${this.apiUrl}/change-password`, passwordChangeRequest, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Deactivating user failed:', error);
                throw error;
            })
        );
    }


    createDeliveryPerson(deliveryPerson: DeliveryPersonCreationDetails):Observable<Number>{

        this.updateHeaders();
        console.log('before direct call'+ deliveryPerson);
        return this.httpClient.post<Number>(`${this.apiUrl}/create-delivery`,deliveryPerson,{headers:this.headers});
    }

}