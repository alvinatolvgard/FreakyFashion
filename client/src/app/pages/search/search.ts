import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductData } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  imports: [ ProductCard ],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private productService = inject(Product);
  private route = inject(ActivatedRoute);
  products = signal<ProductData[]>([]);
  searchTerm = signal('');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      this.searchTerm.set(query);
      this.productService.getProducts(query).subscribe(data => {
        this.products.set(data);
      });
    });
  }
}
