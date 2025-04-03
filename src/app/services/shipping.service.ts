import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ShippingDetails } from "../models/shipping/shipping-details.model";
import { catchError, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ShippingService{
 
    

    private apiUrl = `${environment.apiUrl}/shipments`;
    headers: HttpHeaders =new HttpHeaders();

    constructor(private httpClient:HttpClient)
    {
            this.updateHeaders();                   
    }
    private updateHeaders(): void {
        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        });
    }

        getAllShipments(): Observable<ShippingDetails[]> {
            this.updateHeaders();
            return this.httpClient.get<ShippingDetails[]>(`${this.apiUrl}`, { headers: this.headers }).pipe(
                catchError((error) => {
                    console.error('Getting all shipments failed:', error);
                    throw error;
                })
            );
        }

        processShipment(shipmentId:Number):Observable<ShippingDetails>{

            this.updateHeaders();
            return this.httpClient.put<ShippingDetails>(`${this.apiUrl}/process/${shipmentId}`,[], { headers: this.headers }).pipe(
                catchError((error) => {
                    console.error('proceeding to processed status failed', error);
                    throw error;
                })
            );
        }
        shipShipment(shipmentId:Number):Observable<ShippingDetails>{

            this.updateHeaders();
            return this.httpClient.put<ShippingDetails>(`${this.apiUrl}/ship/${shipmentId}`, [],{ headers: this.headers }).pipe(
                catchError((error) => {
                    console.error('proceeding to shipped status failed', error);
                    throw error;
                })
            );
        }

    
    
}