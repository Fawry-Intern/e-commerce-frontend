import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { ShippingDetails } from '../models/shipping/shipping-details.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient: Client;
  private messageSubject = new Subject<ShippingDetails>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:2222/ws'),
      reconnectDelay: 5000,
      debug: (msg: string) => console.log(msg)
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      this.stompClient.subscribe('/topic/order', (message: Message) => {
        console.log('Received:', message.body);
        const parsedMessage: ShippingDetails = JSON.parse(message.body);
        this.messageSubject.next(parsedMessage);
      });
    };
  }

  openConnection(): void {
    if (!this.stompClient.active) {
      console.log('Opening WebSocket connection...');
      this.stompClient.activate();
    }
  }

  getMessages(): Observable<ShippingDetails> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('WebSocket connection closed.');
    }
  }
}
