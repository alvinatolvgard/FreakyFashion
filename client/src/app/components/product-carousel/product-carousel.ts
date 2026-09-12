import { Component, input, viewChild, ElementRef } from '@angular/core';
import { ProductData } from '../../services/product';
import { ProductCard } from '../product-card/product-card';
import { LucideArrowLeft, LucideArrowRight } from '@lucide/angular';

@Component({
  imports: [ ProductCard, LucideArrowLeft, LucideArrowRight ],
  selector: 'app-product-carousel',
  styleUrl: './product-carousel.css',
  templateUrl: './product-carousel.html',
})
export class ProductCarousel {

  products = input.required<ProductData[]>();
  title = input('NYHETER');
  subtitle = input('SHOPPA HÄR');

  carousel = viewChild<ElementRef<HTMLElement>>('carousel')

  scrollLeft() {
    this.carousel()?.nativeElement.scrollBy({ left: -300, behavior: 'smooth'});
  }

  scrollRight() {
    this.carousel()?.nativeElement.scrollBy({ left: 300, behavior: 'smooth'});
  }
}
