export interface Player {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  battingStyle: string;
  bowlingStyle: string;
  age: number;
  born: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  wickets: number;
  economy: number;
  fifties: number;
  hundreds: number;
  avatar: string;
  bio: string;
  iplTeams: string[];
  isFeatured?: boolean;
}

export interface League {
  id: number;
  name: string;
  shortName: string;
  type: 'International' | 'Domestic' | 'T20 League';
  format: 'Test' | 'ODI' | 'T20' | 'Mixed';
  country: string;
  region: string;
  logo: string;
  color: string;
  description: string;
  currentSeason: string;
  teams: number;
  founded: number;
}

export interface Match {
  id: number;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  format: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  result?: string;
  leagueId: number;
}

export interface IPLTeamRanking {
  rank: number;
  team: string;
  shortName: string;
  color: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: string;
}

export interface IPLSeason {
  year: number;
  winner: string;
  winnerColor: string;
  runnerUp: string;
  finalVenue: string;
  manOfTheSeries: string;
  topScorer: string;
  topWicketTaker: string;
  rankings: IPLTeamRanking[];
  notablePlayers: string[];
}
