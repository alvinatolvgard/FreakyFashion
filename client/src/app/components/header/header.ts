import { Component } from '@angular/core';
import { LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch } from '@lucide/angular';

@Component({
  imports: [LucideHeart, LucideUser, LucideShoppingCart, LucideMenu, LucideSearch],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
