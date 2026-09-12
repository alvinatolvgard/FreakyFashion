import { Service, computed, signal } from '@angular/core';
import { ProductData } from './product';

export interface CartItem {
    product: ProductData;
    size: string;
    quantity: number;
}

@Service()
export class Cart {
    items = signal<CartItem[]>([]);

    addToCart(product: ProductData, size: string) {
        const existing = this.items().find(
            item => item.product.id === product.id && item.size === size
        );

        if (existing) {
            this.updateQuantity(existing, existing.quantity + 1);
        } else {
            this.items.update(items => [...items, { product, size, quantity: 1 }]);
        }
    }

    clearCart() {
        this.items.set([]);
    }

    updateQuantity(item: CartItem, quantity: number) {
        if (quantity < 1) {
            this.removeFromCart(item);
            return;
        }
        this.items.update(items =>
            items.map(i => (i === item ? { ...i, quantity } : i))
        );
    }

    removeFromCart(item: CartItem) {
        this.items.update(items => items.filter(i => i !== item));
    }

    subtotal = computed(() =>
        this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    itemCount = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );
}
