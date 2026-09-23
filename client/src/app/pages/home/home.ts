import { Component, signal, inject, OnInit } from '@angular/core';
import { Product, ProductData } from '../../services/product';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { Hero } from '../../components/hero/hero';

@Component({
  imports: [ ProductCarousel, Hero ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private productService = inject(Product);
  products = signal<ProductData[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      const newProducts = data.filter(product => {
        const published = new Date(product.publishedDate);
        const now = new Date();
        const diffInDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
        return diffInDays <= 7;
      });
      this.products.set(newProducts.slice(0, 8));
    });
  }

  
}
