import { Component, Input } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product!: Product;

}
