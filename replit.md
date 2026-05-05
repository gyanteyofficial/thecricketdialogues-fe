# thecricketdialogues-fe

## Overview
Angular 21 frontend application for "The Cricket Dialogues" project.

## Tech Stack
- **Framework:** Angular 21 (standalone bootstrap)
- **Language:** TypeScript ~5.9
- **Build System:** Angular CLI / `@angular/build`
- **Package Manager:** npm 10.9.4
- **Testing:** Vitest

## Project Structure
```
src/
  main.ts          # App bootstrap (bootstrapApplication)
  app/
    app.ts         # Root component
    app.html       # Root template
    app.css        # Root styles
    app.routes.ts  # Router config
    app.config.ts  # App config (provides router)
  styles.css       # Global styles
public/            # Static assets
```

## Development
- **Start:** `npm start` (runs on port 5000, host 0.0.0.0)
- **Build:** `npm run build`
- **Test:** `npm test`

## Replit Configuration
- Dev server runs on port 5000 with `--allowed-hosts` flag to support the Replit proxy
- `NG_CLI_ANALYTICS=false` is set to skip the interactive analytics prompt
- Workflow: "Start application" → `npm start`

## Deployment
- Deployment target: **static**
- Build command: `npm run build`
- Public directory: `dist/thecricketdialogues-fe/browser`
