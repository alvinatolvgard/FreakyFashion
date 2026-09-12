import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/product';

@Component({
  imports: [ FormsModule ],
  selector: 'app-admin-new-product',
  styleUrl: './admin-new-product.css',
  templateUrl: './admin-new-product.html',
})
export class AdminNewProduct {
  private productService = inject(Product);
  private router = inject(Router);

  formData = {
    name: '',
    details: '',
    imageUrl: '',
    sku: '',
    price: 0,
    publishedDate: ''
  };

  onSubmit() {
    this.productService.createProduct(this.formData).subscribe(() => {
      this.router.navigate(['/admin/produkter']);
    });
  }
}
