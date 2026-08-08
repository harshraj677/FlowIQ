# FlowIQ

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

FlowIQ is a focused distributor operations platform that streamlines inventory, procurement, billing, and collections for trading businesses. It combines a web-first Expo application with a TypeScript Express API and MongoDB-backed datastore to deliver a pragmatic, production-ready foundation for SMB distributors.

For an architectural deep-dive, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Quick links
- Project: FlowIQ
- Frontend: `mobile/` (Expo Router, web-first)
- Backend: `backend/` (Express API)
- Shared types & utilities: `shared/`
- Brand assets: `assets/`

## What this repository contains

- A web-first Expo application with optional native Android/iOS entry points.
- A TypeScript Express API with Mongoose models and domain services.
- Cross-cutting shared utilities and types for consistent models across mobile and API.
- Documentation and architecture notes in `docs/`.

## Key features

- Purchase and stock management with purchase-price snapshotting.
- Customer directory with per-customer ledger and outstanding balance tracking.
- Billing and invoicing with automatic stock deduction and ledger updates.
- Dashboard for business KPIs and at-a-glance summaries.
- Supplier & product catalog to drive purchases and invoicing.

## Tech stack

- Frontend: Expo Router, React, TypeScript, NativeWind, React Query, Zustand
- Backend: Node.js, Express, TypeScript, Mongoose, Zod
- Database: MongoDB
- Tooling: ESLint, Prettier, tsx

## Repository layout

```
FlowIQ/
├── mobile/    # Expo Router application (web-first)
├── backend/   # Express API
├── shared/    # Shared types, constants, schemas
├── assets/    # Brand and design reference files
└── docs/      # Architecture and implementation notes
```

## Getting started (developer)

Prerequisites:

- Node.js 18+ and npm
- MongoDB (local or hosted)

Backend (API)

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` and set `MONGODB_URI` to your MongoDB connection string. Health status is available at `GET http://localhost:4000/api/health` when the API is running.

Frontend (web)

```bash
cd mobile
npm install
npm run web
```

The Expo app runs in the browser by default. Use `npm run android` / `npm run ios` to run on emulators or devices.

## Environment variables

- `backend/.env` — `MONGODB_URI`: MongoDB connection string
- `mobile/.env` — app-specific configuration (if used)

## Available scripts

- Backend: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`
- Mobile: `npm run web`, `npm run android`, `npm run ios`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`

## Roadmap & ideas (prioritized)

1. Analytics & reporting: exportable CSVs, scheduled reports, visual charts for sales and stock velocity.
2. Offline-capable mobile workflows: local queueing for purchases and invoices with background sync.
3. Multi-warehouse & transfer management with per-location inventory and reconciliation.
4. Role-based access control and audit logs for compliance and multi-user environments.
5. Integrations: accounting exports (CSV/QuickBooks), supplier EDI/CSV imports, and payment gateway support.
6. Automated reconciliation: match payments, generate reminders, and support bulk collection runs.
7. CI/CD and Docker deployment manifests for repeatable production deployments.

## Contributing

If you'd like to contribute, please:

1. Open an issue describing the change or feature.
2. Create a branch with a descriptive name (e.g., `feature/warehouse-sync`).
3. Add tests where relevant and run lint/typecheck.
4. Submit a pull request with a clear description and any migration notes.

## Notes

- The canonical design and domain model live in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- This repository is currently private; check license and sharing policies before publishing.

---
_If you want, I can also add a short `CONTRIBUTING.md`, a `ROADMAP.md`, or create GitHub issue templates and a PR template to standardize contributions._
