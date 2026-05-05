import { Component, Input, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

@Component({
  selector: 'app-ad-banner',
  imports: [CommonModule],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.css'
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {
  @Input() format: 'leaderboard' | 'rectangle' | 'responsive' = 'responsive';
  @Input() slot = '';

  private pushed = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      this.pushed = true;
    } catch (e) {}
  }

  ngOnDestroy() {}

  get adStyle(): string {
    if (this.format === 'leaderboard') return 'display:block;width:100%;min-height:90px;';
    if (this.format === 'rectangle') return 'display:block;width:100%;min-height:250px;';
    return 'display:block;';
  }

  get adFormat(): string {
    return 'auto';
  }
}
