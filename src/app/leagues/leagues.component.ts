import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CricketService } from '../services/cricket.service';
import { League } from '../models/cricket.models';
import { AdBannerComponent } from '../shared/ad-banner/ad-banner.component';

@Component({
  selector: 'app-leagues',
  imports: [CommonModule, FormsModule, AdBannerComponent],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.css'
})
export class LeaguesComponent implements OnInit {
  leagues: League[] = [];
  filtered: League[] = [];
  typeFilter = 'All';
  formatFilter = 'All';
  searchTerm = '';
  types = ['All', 'International', 'Domestic', 'T20 League'];
  formats = ['All', 'Test', 'ODI', 'T20', 'Mixed'];

  constructor(private cricket: CricketService) {}

  ngOnInit() {
    this.leagues = this.cricket.getLeagues();
    this.applyFilters();
  }

  applyFilters() {
    this.filtered = this.leagues.filter(l => {
      const matchType = this.typeFilter === 'All' || l.type === this.typeFilter;
      const matchFormat = this.formatFilter === 'All' || l.format === this.formatFilter;
      const matchSearch = !this.searchTerm || l.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || l.country.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchType && matchFormat && matchSearch;
    });
  }

  getTypeBadge(type: string) {
    return type === 'International' ? 'badge-orange' : type === 'Domestic' ? 'badge-blue' : 'badge-purple';
  }

  getFormatBadge(format: string) {
    const map: Record<string, string> = { 'Test': 'badge-purple', 'ODI': 'badge-blue', 'T20': 'badge-green', 'Mixed': 'badge-teal' };
    return map[format] || 'badge-blue';
  }
}
