import { Component, signal } from '@angular/core';
import { LucideSend, LucidePackageOpen, LucidePackage, LucideCoins, LucideChevronDown } from '@lucide/angular';

@Component({
  imports: [LucideSend, LucidePackageOpen, LucidePackage, LucideCoins, LucideChevronDown

  ],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {

  openColumn = signal<string | null>(null);

  toggleColumn(name: string) {
    this.openColumn.set(this.openColumn() === name ? null : name);
  }
}
