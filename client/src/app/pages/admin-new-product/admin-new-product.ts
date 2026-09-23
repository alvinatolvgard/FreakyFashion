import { Component, inject, signal } from '@angular/core';
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
  errorMessage = signal('');


  formData = {
    name: '',
    details: '',
    imageUrl: '',
    sku: '',
    price: 0,
    publishedDate: ''
  };

  onSubmit() {
    this.errorMessage.set('');
    this.productService.createProduct(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/admin/produkter']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error ?? 'Något gick fel, försök igen.')
      }
    })
  }
}
