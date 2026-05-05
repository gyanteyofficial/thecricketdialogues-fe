import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ScoreTickerComponent } from './shared/score-ticker/score-ticker.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ScoreTickerComponent],
  template: `
    <app-navbar></app-navbar>
    <app-score-ticker></app-score-ticker>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {}
