import { Component, OnInit, signal, inject, } from '@angular/core';
import { ProductData, Product } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../services/cart';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { LucidePackage, LucideTruck, LucideCreditCard } from '@lucide/angular'

@Component({
  imports: [ProductCarousel, LucidePackage, LucideTruck, LucideCreditCard],
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
  justAdded = signal(false);

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
    this.justAdded.set(true);

    setTimeout(() => {
      this.justAdded.set(false);
    }, 2000);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['id'];
      this.selectedSize.set(null);

      this.productService.getProducts().subscribe(allProducts => {
        const match = allProducts.find(p => this.slugify(p.name, p.sku) === slug);
        this.product.set(match ?? null);

        if (match) {
          const others = allProducts.filter(p => p.id !== match.id);
          this.similarProducts.set(others.slice(0, 6));
        }
      });
    });
  }

  slugify(name: string, sku: string): string {
    const base = name
      .toLowerCase()
      .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

      const suffix = sku.replace(/[^0-9]/g, '');
      return `${base}-${suffix}`;
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
      .map(line => line.replace(/^-\s*/, ''));
  }

}
