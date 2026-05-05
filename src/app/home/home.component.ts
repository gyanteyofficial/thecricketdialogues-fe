import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CricketService } from '../services/cricket.service';
import { Player, League, Match } from '../models/cricket.models';
import { AdBannerComponent } from '../shared/ad-banner/ad-banner.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, AdBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredPlayers: Player[] = [];
  leagues: League[] = [];
  recentMatches: Match[] = [];
  stats = [
    { label: 'Players Profiled', value: '22+', icon: '👤' },
    { label: 'Leagues Covered', value: '12', icon: '🏆' },
    { label: 'IPL Seasons', value: '17', icon: '🏏' },
    { label: 'Countries', value: '10+', icon: '🌍' },
  ];

  constructor(private cricket: CricketService) {}

  ngOnInit() {
    this.featuredPlayers = this.cricket.getPlayers().filter(p => p.isFeatured);
    this.leagues = this.cricket.getLeagues().slice(0, 6);
    this.recentMatches = this.cricket.getMatches();
  }

  getRoleBadge(role: string) {
    const map: Record<string, string> = { 'Batsman': 'badge-blue', 'Bowler': 'badge-red', 'All-rounder': 'badge-green', 'Wicket-keeper': 'badge-orange' };
    return map[role] || 'badge-blue';
  }

  getLeagueBadge(type: string) {
    return type === 'International' ? 'badge-orange' : type === 'Domestic' ? 'badge-blue' : 'badge-purple';
  }

  getMatchStatusClass(status: string) {
    return status === 'Live' ? 'status-live' : status === 'Upcoming' ? 'status-upcoming' : 'status-done';
  }
}
