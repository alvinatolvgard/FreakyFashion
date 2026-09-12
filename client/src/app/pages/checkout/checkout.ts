import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
  imports: [ LucideArrowLeft, FormsModule ],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private router = inject(Router);
  cartService = inject(Cart);

  shippingFee = 39.99;
  freeShippingThreshold = 799;

  formData = {
    firstName: '',
    lastName: '',
    adress: '',
    postalCode: '',
    city: '',
  };

  get shipping() {
    return this.cartService.subtotal() >= this.freeShippingThreshold ? 0 : this.shippingFee;
  }

  get total() {
    return this.cartService.subtotal() + this.shipping;
  }

  completeOrder() {
    this.cartService.clearCart();
    this.router.navigate(['/tack']);
  }
}
