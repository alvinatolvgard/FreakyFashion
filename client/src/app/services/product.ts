import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

export interface ProductData {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    details: string;
    sku: string;
    publishedDate: string;
}

@Service()
export class Product {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/products';

    getProducts(search?: string) {
        let url = this.apiUrl;
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        return this.http.get<ProductData[]>(url);
    }

    getProductById(id: string) {
        return this.http.get<ProductData>(`${this.apiUrl}/${id}`);
    }

    deleteProduct(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    createProduct(product: Omit<ProductData, 'id'>) {
    return this.http.post<ProductData>(this.apiUrl, product);
    }
}
