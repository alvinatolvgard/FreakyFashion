import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch } from '@lucide/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch, FormsModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);
  searchInput = '';
  mobileSearchOpen = signal(false);

  toggleMobileSearch() {
    this.mobileSearchOpen.set(!this.mobileSearchOpen());
  }

  onSearch() {
    if (this.searchInput.trim().length < 2) {
      return;
    }
    this.router.navigate(['/sok'], { queryParams: { q: this.searchInput } });
    this.mobileSearchOpen.set(false);

  }

  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
