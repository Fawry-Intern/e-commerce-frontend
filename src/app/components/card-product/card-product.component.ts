import { Component, Input } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../../dtos/orders/order-item.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product!: Product;
  @Input() storeId!: number;

  constructor(private orderService: OrderService) {
    this.orderService.clearCart();
  }

  cartItem: OrderItem = {
    storeId: 0,
    productId: 0,
    quantity: 1,
    price: 0,
    imageUrl: ''
  };

  addToCart() {
    this.updateCartItem();
    this.orderService.addToCart(this.cartItem);
  }

  updateCartItem() {
    this.cartItem.imageUrl = this.product.imageUrl;
    this.cartItem.price = this.product.price;
    this.cartItem.productId = this.product.id;
    this.cartItem.storeId = this.storeId;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default/product.png';
  }
}
