import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { ProductDetail } from './pages/product-detail/product-detail';
import { CartPage } from './pages/cart/cartPage';
import { Checkout } from './pages/checkout/checkout';
import { OrderConfirmation } from './pages/order-confirmation/order-confirmation';
import { AdminProductList } from './pages/admin-product-list/admin-product-list';
import { AdminNewProduct } from './pages/admin-new-product/admin-new-product';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'sok', component: Search},
    { path: 'produkt/:id', component: ProductDetail },
    { path: 'varukorg', component: CartPage },
    { path: 'kassa', component: Checkout },
    { path: 'tack', component: OrderConfirmation },
    { path: 'admin/produkter', component: AdminProductList },
    { path: 'admin/produkter/ny', component: AdminNewProduct },

];
