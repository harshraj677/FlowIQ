# FlowIQ

Distributor Management System — a production-grade ERP for a Bisleri
distributor's daily operations (stock, billing, customers, collections,
transport, expenses, reports).

Runs as a **web app** (React via Expo Router + react-native-web). See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit
together.

## Tech stack

- **Web app**: Expo (React + react-native-web) + TypeScript, Expo Router,
  NativeWind, React Query, Zustand, React Hook Form, Reanimated, Gesture
  Handler
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB via Mongoose

## Getting started

### Web app

```bash
cd mobile
npm install
cp .env.example .env   # already done for local dev
npm run dev             # starts the web dev server (expo start --web)
```

No Android Studio, Xcode, SDKs, or emulators required — it opens directly
in your browser. Other useful scripts: `npm run build` (static web export),
`npm run lint`, `npm run typecheck`, `npm run format`.

### Backend

```bash
cd backend
npm install
cp .env.example .env    # already done for local dev — point MONGODB_URI
                          # at your local/remote MongoDB instance
npm run dev              # starts the API with hot reload on PORT (default 4000)
```

Once running, `GET http://localhost:4000/api/health` reports API and
MongoDB connection status. Other scripts: `npm run lint`, `npm run
typecheck`, `npm run build`, `npm run format`.

## Repository layout

```
flowiq/
├── mobile/     Expo Router web app (despite the folder name — see below)
├── backend/    Express API
├── shared/     Cross-cutting types (empty until needed)
├── assets/     Design references / brand source files
└── docs/       Architecture notes
```

The `mobile/` folder name is a holdover from Phase 1, when the app targeted
Android. It now builds for web only; the folder wasn't renamed to avoid
churning every import path across the codebase.

## Status

Phases 1–4 are complete: foundation & UI, purchase & stock management,
customer management & ledger, and billing & invoicing (with automatic
stock deduction, purchase-price snapshotting, and customer outstanding
tracking). See commit history for details on each phase.
