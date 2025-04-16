import { Component, Input } from '@angular/core';
import { Store } from '../../models/store/store.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-store',
  imports: [RouterModule],
  templateUrl: './card-store.component.html',
  styleUrl: './card-store.component.css'
})
export class CardStoreComponent {
  @Input() store!: Store;

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default/store.png';
  }
}
