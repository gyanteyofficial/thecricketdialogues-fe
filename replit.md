# CricketDialogues - Cricket Information Website

## Overview
A comprehensive Angular 21 cricket information website featuring leagues, player profiles, IPL history, and match data with a dark cricket-themed UI.

## Tech Stack
- **Framework:** Angular 21 (standalone components, lazy-loaded routes)
- **Language:** TypeScript ~5.9
- **Build System:** Angular CLI / `@angular/build`
- **Package Manager:** npm 10.9.4

## Features
1. **Home Page** - Hero section, featured players, leagues overview, recent matches
2. **Leagues** - 12 leagues (International + Domestic) with type/format filters and search
3. **Players** - 22 players filterable by country, role, sortable by stats (runs/wickets/matches/average)
4. **Player Profile** - Full stats, bio, performance bars, IPL team history, related players
5. **IPL Hub** - Year-wise seasons (2008-2024) with:
   - Season overview (Man of Series, top scorer, wicket taker)
   - All-time champions list
   - Team rankings table with points/NRR
   - Player lists by year

## Project Structure
```
src/
  app/
    models/cricket.models.ts     # TypeScript interfaces
    services/cricket.service.ts  # All data (players, leagues, IPL, matches)
    shared/navbar/               # Sticky navigation component
    home/                        # Landing page
    leagues/                     # Leagues & tournaments
    players/                     # Player listing with filters
    player-profile/              # Individual player profile
    ipl/                         # IPL hub with year selector
    app.routes.ts                # Lazy-loaded routes
    app.ts                       # Root component
  styles.css                     # Global dark theme with CSS variables
```

## Development
- **Start:** `npm start` (port 5000, host 0.0.0.0)
- **Build:** `npm run build`

## Deployment
- Target: **static**
- Build command: `npm run build`
- Public directory: `dist/thecricketdialogues-fe/browser`
