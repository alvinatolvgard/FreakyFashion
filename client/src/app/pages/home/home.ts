import { Component, signal, inject, viewChild, ElementRef, OnInit } from '@angular/core';
import { Product, ProductData } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';
import { LucideArrowLeft, LucideArrowRight } from '@lucide/angular';

@Component({
  imports: [ ProductCard, LucideArrowLeft, LucideArrowRight  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private productService = inject(Product);
  products = signal<ProductData[]>([]);
  carousel = viewChild<ElementRef<HTMLElement>>('carousel');

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  scrollLeft() {
    this.carousel()?.nativeElement.scrollBy({ left: -300, behavior: 'smooth'});
  }

  scrollRight() {
    this.carousel()?.nativeElement.scrollBy({ left: 300, behavior: 'smooth'});
  }
}
