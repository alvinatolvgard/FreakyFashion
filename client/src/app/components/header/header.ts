import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch } from '@lucide/angular';
import { Router } from '@angular/router';

@Component({
  imports: [ LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch, FormsModule ],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);
  searchInput = '';
  
  onSearch() {
    if (this.searchInput.trim()) {
      this.router.navigate(['/sok'], {queryParams: { q: this.searchInput } });
    }
  }
}
