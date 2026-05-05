import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MatchTicker {
  id: number;
  status: 'LIVE' | 'UPCOMING' | 'RESULT';
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  score1?: string;
  score2?: string;
  overs?: string;
  summary: string;
  format: string;
}

@Component({
  selector: 'app-score-ticker',
  imports: [CommonModule],
  templateUrl: './score-ticker.component.html',
  styleUrl: './score-ticker.component.css'
})
export class ScoreTickerComponent implements OnInit, OnDestroy {
  private interval: ReturnType<typeof setInterval> | null = null;
  private liveRunCount = 0;

  matches: MatchTicker[] = [
    {
      id: 1, status: 'LIVE', format: 'T20I',
      team1: 'India', flag1: '🇮🇳', score1: '187/4',
      team2: 'Australia', flag2: '🇦🇺', score2: '142/6',
      overs: '16.3', summary: 'IND need 46 off 21 balls'
    },
    {
      id: 2, status: 'LIVE', format: 'ODI',
      team1: 'England', flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score1: '312/7',
      team2: 'South Africa', flag2: '🇿🇦', score2: '289/6',
      overs: '47.2', summary: 'SA need 24 off 16 balls'
    },
    {
      id: 3, status: 'LIVE', format: 'Test',
      team1: 'Pakistan', flag1: '🇵🇰', score1: '234/8',
      team2: 'New Zealand', flag2: '🇳🇿', score2: '401',
      overs: '78.4', summary: 'PAK trail by 167 runs — Day 3'
    },
    {
      id: 4, status: 'UPCOMING', format: 'T20I',
      team1: 'West Indies', flag1: '🏝️', score1: undefined,
      team2: 'Bangladesh', flag2: '🇧🇩', score2: undefined,
      overs: undefined, summary: 'Starts in 2h 30m • Barbados'
    },
    {
      id: 5, status: 'UPCOMING', format: 'IPL 2025',
      team1: 'MI', flag1: '🔵', score1: undefined,
      team2: 'CSK', flag2: '🟡', score2: undefined,
      overs: undefined, summary: 'Starts in 4h 15m • Wankhede'
    },
    {
      id: 6, status: 'RESULT', format: 'ODI',
      team1: 'Sri Lanka', flag1: '🇱🇰', score1: '278/9',
      team2: 'Afghanistan', flag2: '🇦🇫', score2: '241',
      overs: undefined, summary: 'Sri Lanka won by 37 runs'
    },
    {
      id: 7, status: 'RESULT', format: 'Test',
      team1: 'Australia', flag1: '🇦🇺', score1: '556/4d & 203/3d',
      team2: 'England', flag2: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score2: '325 & 279',
      overs: undefined, summary: 'Australia won by 155 runs'
    }
  ];

  ngOnInit() {
    this.interval = setInterval(() => {
      this.simulateLiveUpdate();
    }, 8000);
  }

  private simulateLiveUpdate() {
    this.liveRunCount++;
    this.matches = this.matches.map(m => {
      if (m.status !== 'LIVE') return m;
      return { ...m, score1: this.bumpScore(m.score1 ?? '0/0', this.liveRunCount) };
    });
  }

  private bumpScore(score: string, seed: number): string {
    const parts = score.split('/');
    if (parts.length !== 2) return score;
    const runs = parseInt(parts[0], 10) + (seed % 2 === 0 ? 1 : 2);
    return `${runs}/${parts[1]}`;
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
