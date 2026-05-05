import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CricketService } from '../services/cricket.service';
import { IPLSeason } from '../models/cricket.models';

@Component({
  selector: 'app-ipl',
  imports: [CommonModule, FormsModule],
  templateUrl: './ipl.component.html',
  styleUrl: './ipl.component.css'
})
export class IplComponent implements OnInit {
  seasons: IPLSeason[] = [];
  selectedYear: number = 2024;
  activeTab: 'overview' | 'rankings' | 'players' = 'overview';
  players: { name: string; team: string; role: string; country: string; runs?: number; wickets?: number }[] = [];
  playerSort = 'runs';

  get selectedSeason(): IPLSeason | undefined {
    return this.seasons.find(s => s.year === this.selectedYear);
  }

  get sortedPlayers() {
    return [...this.players].sort((a, b) => {
      if (this.playerSort === 'runs') return (b.runs || 0) - (a.runs || 0);
      if (this.playerSort === 'wickets') return (b.wickets || 0) - (a.wickets || 0);
      return a.name.localeCompare(b.name);
    });
  }

  constructor(private cricket: CricketService) {}

  ngOnInit() {
    this.seasons = this.cricket.getIPLSeasons().sort((a, b) => b.year - a.year);
    this.loadSeason();
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.loadSeason();
  }

  loadSeason() {
    this.players = this.cricket.getIPLPlayersByYear(this.selectedYear);
  }

  getRankMedal(rank: number) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  }

  getRoleBadge(role: string) {
    const map: Record<string, string> = { 'Batsman': 'badge-blue', 'Bowler': 'badge-red', 'All-rounder': 'badge-green', 'Wicket-keeper': 'badge-orange' };
    return map[role] || 'badge-blue';
  }

  getCountryFlag(country: string) {
    const map: Record<string, string> = {
      'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'Pakistan': '🇵🇰', 'New Zealand': '🇳🇿', 'South Africa': '🇿🇦',
      'Bangladesh': '🇧🇩', 'Afghanistan': '🇦🇫', 'West Indies': '🏝️', 'Sri Lanka': '🇱🇰',
    };
    return map[country] || '🌍';
  }

  getAllWinners() {
    return this.seasons.map(s => ({ year: s.year, winner: s.winner, color: s.winnerColor, runnerUp: s.runnerUp }));
  }
}
