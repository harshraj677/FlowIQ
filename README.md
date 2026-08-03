# FlowIQ

Distributor Management System — a production-grade ERP for a Bisleri
distributor's daily operations (stock, billing, customers, collections,
transport, expenses, reports).

This is **Phase 1**: project foundation and UI architecture only. No
business logic, CRUD endpoints, or sample data — see
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit
together.

## Tech stack

- **Mobile**: Expo (React Native) + TypeScript, Expo Router, NativeWind,
  React Query, Zustand, React Hook Form, Reanimated, FlashList, Gesture
  Handler
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB via Mongoose

## Getting started

### Mobile

```bash
cd mobile
npm install
cp .env.example .env   # already done for local dev
npm run start           # Expo dev server
npm run android          # or press "a" in the Expo CLI
```

Other useful scripts: `npm run lint`, `npm run typecheck`, `npm run format`.

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
├── mobile/     Expo Router app
├── backend/    Express API
├── shared/     Cross-cutting types (empty until Phase 2)
├── assets/     Design references / brand source files
└── docs/       Architecture notes
```

## Phase 1 checklist

- [x] Monorepo structure (`mobile/`, `backend/`, `shared/`, `assets/`, `docs/`)
- [x] Expo + TypeScript + Expo Router + NativeWind project
- [x] Backend Express + TypeScript skeleton, MongoDB connection wired
- [x] Centralized theme (colors, typography, spacing) — no hardcoded values
- [x] Reusable component library (buttons, cards, inputs, dialogs, empty
      states, skeletons, stat/customer/invoice/product cards)
- [x] Bottom tab navigation matching the approved mockup (elevated center
      "Bill" action)
- [x] Empty-state screens for every module (Dashboard, Stock, Purchase,
      Bills, Customers, Customer Ledger, Collections, Transport, Expenses,
      Reports, Settings)
- [x] Zustand store scaffolding (structure only, no business logic)
- [x] React Query client configured
- [x] Animated splash screen + placeholder app icon
- [x] ESLint + Prettier + TypeScript strict mode, both packages
- [x] `.env.example` for both packages, no hardcoded secrets

Ready for Phase 2 (first real module + CRUD).
