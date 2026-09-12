import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart, CartItem } from '../../services/cart'
import { LucideTrash2 } from '@lucide/angular';

@Component({
  imports: [ RouterLink, LucideTrash2 ],
  selector: 'app-cart',
  styleUrl: './cartPage.css',
  templateUrl: './cartPage.html',
})
export class CartPage {
  cartService = inject(Cart);

  shippingFee = 39.99;
  freeShippingThreshold = 799;

  get shipping() {
    return this.cartService.subtotal() >= this.freeShippingThreshold ? 0 : this.shippingFee;
  }

  get total() {
    return this.cartService.subtotal() + this.shipping;
  }

  increseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, item.quantity - 1);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
}
