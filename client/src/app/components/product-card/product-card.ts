import { Component, input, computed } from '@angular/core';
import { ProductData } from '../../services/product';
import { Router, RouterLink } from '@angular/router';
import { LucideHeart } from '@lucide/angular';

@Component({
  imports: [ LucideHeart, RouterLink ],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<ProductData>();

  isNew = computed(() => {
  const published = new Date(this.product().publishedDate);
  const now = new Date();
  const diffInDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
})
}

