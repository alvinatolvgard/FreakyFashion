import { Component, OnInit, signal, inject, } from '@angular/core';
import { ProductData, Product } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../services/cart';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { LucidePackage, LucideTruck, LucideCreditCard } from '@lucide/angular'

@Component({
  imports: [ ProductCarousel, LucidePackage, LucideTruck, LucideCreditCard ],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private productService = inject(Product);
  private cartService = inject(Cart);
  private route = inject(ActivatedRoute);

  product = signal<ProductData | null>(null);
  openSection = signal<string | null>('beskrivning');
  similarProducts = signal<ProductData[]>([]);
  selectedSize = signal<string | null>(null);

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  addToCart() {
    const currentProduct = this.product();
    const size = this.selectedSize();

    if (!currentProduct || !size) {
      return;
    }

    this.cartService.addToCart(currentProduct, size);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.selectedSize.set(null);
      this.productService.getProductById(id).subscribe(data => {
        this.product.set(data);
      });

      this.productService.getProducts().subscribe(allProducts => {
        const others = allProducts.filter(p => p.id !== Number(id));
        this.similarProducts.set(others.slice(0, 6));
      });
    });
  }

  toggleSection(name: string) {
    this.openSection.set(this.openSection() === name ? null : name);
  }

  descriptionIntro(p: ProductData): string {
    return p.details.split('\n')[0];
  }

  descriptionBullets(p: ProductData): string[] {
    return p.details
    .split('\n')
    .slice(1)
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/,''));
  }

}
