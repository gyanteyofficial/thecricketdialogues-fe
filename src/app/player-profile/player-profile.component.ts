import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CricketService } from '../services/cricket.service';
import { Player } from '../models/cricket.models';
import { AdBannerComponent } from '../shared/ad-banner/ad-banner.component';

@Component({
  selector: 'app-player-profile',
  imports: [CommonModule, RouterLink, AdBannerComponent],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css'
})
export class PlayerProfileComponent implements OnInit {
  player: Player | undefined;
  relatedPlayers: Player[] = [];
  Math = Math;

  constructor(private route: ActivatedRoute, private cricket: CricketService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const all = this.cricket.getPlayers();
      this.player = all.find(p => p.id === id);
      if (this.player) {
        this.relatedPlayers = all.filter(p => p.country === this.player!.country && p.id !== id).slice(0, 3);
      }
    });
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
      'Pakistan': 'linear-gradient(135deg, #01411c, #3cbc3c)',
      'New Zealand': 'linear-gradient(135deg, #000000, #00247d)',
      'South Africa': 'linear-gradient(135deg, #007a4d, #ffb612)',
      'Bangladesh': 'linear-gradient(135deg, #006a4e, #f42a41)',
      'Afghanistan': 'linear-gradient(135deg, #000000, #d32011)',
    };
    return map[country] || 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))';
  }

  getFlag(country: string) {
    const map: Record<string, string> = {
      'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'Pakistan': '🇵🇰', 'New Zealand': '🇳🇿', 'South Africa': '🇿🇦',
      'Bangladesh': '🇧🇩', 'Afghanistan': '🇦🇫', 'West Indies': '🏝️',
    };
    return map[country] || '🌍';
  }

  getRelatedRoleBadge(role: string) {
    return this.getRoleBadge(role);
  }
}
