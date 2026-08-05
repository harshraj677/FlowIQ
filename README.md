# FlowIQ

FlowIQ is a distributor operations platform designed to manage the daily
workflows that keep a trading business running: stock, billing, customers,
collections, transport, expenses, and reporting.

The repository is organized as a monorepo with a web-first Expo application,
an Express API, and shared assets and documentation.

For a deeper architectural overview, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Overview

- Web application: Expo Router, React, TypeScript, NativeWind, React Query,
  and Zustand
- API layer: Node.js, Express, TypeScript, and Mongoose
- Data store: MongoDB
- Repository layout: `mobile/`, `backend/`, `shared/`, `assets/`, and `docs/`

## Getting Started

### 1. Web Application

```bash
cd mobile
npm install
npm run dev
```

The app runs in the browser through Expo, so Android Studio, Xcode, and mobile
device emulators are not required for day-to-day development.

Common commands:

- `npm run web` starts the web dev server
- `npm run build` creates a static web export
- `npm run lint` runs lint checks
- `npm run typecheck` runs the TypeScript compiler in no-emit mode
- `npm run format` formats the codebase with Prettier

### 2. Backend API

```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env` file and set `MONGODB_URI` to your local or hosted
MongoDB connection string.

Common commands:

- `npm run build` compiles the API for production
- `npm run start` runs the compiled server from `dist/`
- `npm run lint` runs ESLint
- `npm run typecheck` checks the backend with TypeScript
- `npm run format` formats backend source files

When the API is running, `GET http://localhost:4000/api/health` returns API
and database status information.

## Project Structure

```
flowiq/
├── mobile/   Expo Router web application
├── backend/  Express API
├── shared/   Cross-cutting types and utilities
├── assets/   Brand and design reference files
└── docs/     Architecture and implementation notes
```

The `mobile/` folder name is retained for compatibility with the existing
codebase, even though the app currently targets the web.

## Current Scope

The product currently covers:

- Foundation UI and navigation
- Purchase and stock management
- Customer management and ledger tracking
- Billing and invoicing with automatic stock deduction
- Purchase-price snapshotting and outstanding balance tracking

## Additional Notes

- The source of truth for the system design is [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- Backend configuration lives in `backend/.env`.
- Web application configuration lives in `mobile/.env`.
