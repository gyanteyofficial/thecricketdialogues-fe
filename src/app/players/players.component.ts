import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CricketService } from '../services/cricket.service';
import { Player } from '../models/cricket.models';

@Component({
  selector: 'app-players',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  filtered: Player[] = [];
  searchTerm = '';
  countryFilter = 'All';
  roleFilter = 'All';
  sortBy = 'name';

  countries: string[] = [];
  roles = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];
  sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'country', label: 'Country' },
    { value: 'runs', label: 'Most Runs' },
    { value: 'wickets', label: 'Most Wickets' },
    { value: 'matches', label: 'Most Matches' },
    { value: 'average', label: 'Best Average' },
  ];

  countryFlags: Record<string, string> = {
    'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Pakistan': '🇵🇰', 'New Zealand': '🇳🇿', 'South Africa': '🇿🇦',
    'Bangladesh': '🇧🇩', 'Afghanistan': '🇦🇫', 'West Indies': '🏝️',
    'Sri Lanka': '🇱🇰', 'Zimbabwe': '🇿🇼',
  };

  constructor(private cricket: CricketService) {}

  ngOnInit() {
    this.players = this.cricket.getPlayers();
    this.countries = ['All', ...Array.from(new Set(this.players.map(p => p.country))).sort()];
    this.applyFilters();
  }

  applyFilters() {
    let result = this.players.filter(p => {
      const matchSearch = !this.searchTerm || p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.country.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCountry = this.countryFilter === 'All' || p.country === this.countryFilter;
      const matchRole = this.roleFilter === 'All' || p.role === this.roleFilter;
      return matchSearch && matchCountry && matchRole;
    });

    result.sort((a, b) => {
      switch (this.sortBy) {
        case 'country': return a.country.localeCompare(b.country);
        case 'runs': return b.runs - a.runs;
        case 'wickets': return b.wickets - a.wickets;
        case 'matches': return b.matches - a.matches;
        case 'average': return b.average - a.average;
        default: return a.name.localeCompare(b.name);
      }
    });
    this.filtered = result;
  }

  getRoleBadge(role: string) {
    const map: Record<string, string> = { 'Batsman': 'badge-blue', 'Bowler': 'badge-red', 'All-rounder': 'badge-green', 'Wicket-keeper': 'badge-orange' };
    return map[role] || 'badge-blue';
  }

  getAvatarGradient(country: string) {
    const map: Record<string, string> = {
      'India': 'linear-gradient(135deg, #ff6b35, #f7c59f)',
      'Australia': 'linear-gradient(135deg, #ffd700, #228b22)',
      'England': 'linear-gradient(135deg, #003087, #cf142b)',
      'Pakistan': 'linear-gradient(135deg, #01411c, #ffffff)',
      'New Zealand': 'linear-gradient(135deg, #000000, #00247d)',
      'South Africa': 'linear-gradient(135deg, #007a4d, #ffb612)',
      'Bangladesh': 'linear-gradient(135deg, #006a4e, #f42a41)',
      'Afghanistan': 'linear-gradient(135deg, #000000, #d32011)',
    };
    return map[country] || 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))';
  }

  getFlag(country: string) {
    return this.countryFlags[country] || '🌍';
  }
}
