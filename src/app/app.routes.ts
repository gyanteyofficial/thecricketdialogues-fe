import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'leagues',
    loadComponent: () => import('./leagues/leagues.component').then(m => m.LeaguesComponent)
  },
  {
    path: 'players',
    loadComponent: () => import('./players/players.component').then(m => m.PlayersComponent)
  },
  {
    path: 'players/:id',
    loadComponent: () => import('./player-profile/player-profile.component').then(m => m.PlayerProfileComponent)
  },
  {
    path: 'ipl',
    loadComponent: () => import('./ipl/ipl.component').then(m => m.IplComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
