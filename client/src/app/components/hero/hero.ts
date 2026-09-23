import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero implements OnInit, OnDestroy {
  desktopImages = signal<string[]>([
    'hero-desktop.png',
    'hero2.png',
    "hero3.png"
  ]);

  mobileImages = signal<string[]>([
    'hero-mobile.png',
    'hero-mobile2.png',
    'hero-mobile3.png'
  ]);

  currentIndex = signal(0);

  private intervalId: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.desktopImages().length);
    }, 7000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
