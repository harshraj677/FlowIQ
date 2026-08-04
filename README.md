# FlowIQ

FlowIQ is a distributor management system for daily operations such as
stock, billing, customers, collections, transport, expenses, and reports.
The user-facing app runs as a web app built with Expo Router and
react-native-web.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the deeper breakdown of
how the front end, backend, and shared patterns fit together.

## What’s Included

- Web app: Expo + React + TypeScript + NativeWind + React Query + Zustand
- Backend: Node.js + Express + TypeScript + Mongoose
- Database: MongoDB
- Layout: monorepo with separate `mobile/`, `backend/`, `shared/`, `assets/`,
  and `docs/` folders

## Quick Start

### Web App

```bash
cd mobile
npm install
cp .env.example .env
npm run dev
```

The app opens in the browser, so no Android Studio, Xcode, SDKs, or
emulators are required. Useful scripts in `mobile/`:

- `npm run web` for the web dev server
- `npm run build` for static web export
- `npm run lint`
- `npm run typecheck`
- `npm run format`

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGODB_URI` in `backend/.env` to a local or remote MongoDB instance.
Useful scripts in `backend/`:

- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run format`

When the API is running, `GET http://localhost:4000/api/health` reports API
and MongoDB connection status.

## Repository Layout

```
flowiq/
├── mobile/     Expo Router web app
├── backend/    Express API
├── shared/     Cross-cutting types and shared utilities
├── assets/     Design references and brand source files
└── docs/       Architecture notes
```

The `mobile/` folder name is historical. It now targets web only, but the
folder was kept to avoid renaming imports throughout the codebase.

## Current Scope

The app currently covers foundation/UI, purchase and stock management,
customer management and ledger tracking, and billing and invoicing with
automatic stock deduction, purchase-price snapshotting, and customer
outstanding tracking.
