# FlowIQ

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

FlowIQ is a modern operations platform for distributors and trading businesses. It brings inventory, purchasing, invoicing, customer ledger management, and reporting into a unified workflow designed for clarity, speed, and operational control.

The platform combines a web-first Expo application with a TypeScript Express API and a MongoDB-backed data layer to provide a practical foundation for SMB distributors.

For a deeper technical overview, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Why FlowIQ

- Streamline procurement and stock control
- Improve billing accuracy with automated stock deduction and ledger updates
- Gain better visibility into receivables, supplier activity, and business KPIs
- Deliver a responsive, mobile-friendly experience for day-to-day operations

## Core capabilities

- Purchase and stock management with purchase-price snapshotting
- Customer directory with per-customer ledger and outstanding balance tracking
- Billing and invoicing workflows with automated financial updates
- Dashboard summaries for sales, collections, and inventory health
- Supplier and product catalog management to support procurement and invoicing

## Tech stack

- Frontend: Expo Router, React, TypeScript, NativeWind, React Query, Zustand
- Backend: Node.js, Express, TypeScript, Mongoose, Zod
- Database: MongoDB
- Tooling: ESLint, Prettier, tsx

## Repository structure

```text
FlowIQ/
├── mobile/   # Expo Router web application
├── backend/  # Express and TypeScript API
├── shared/   # Shared types and utilities
├── assets/   # Brand and design reference assets
└── docs/     # Architecture and implementation notes
```

## Getting started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or hosted)

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a file named `backend/.env` and set `MONGODB_URI` to your MongoDB connection string. The health endpoint is available at `http://localhost:4000/api/health` when the API is running.

### Frontend

```bash
cd mobile
npm install
npm run web
```

The Expo app runs in the browser by default. Use `npm run android` or `npm run ios` for device-based testing.

## Environment variables

- `backend/.env` — `MONGODB_URI`: MongoDB connection string
- `mobile/.env` — application-specific configuration when required

## Available scripts

- Backend: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`
- Mobile: `npm run web`, `npm run android`, `npm run ios`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`

## Roadmap

1. Exportable analytics and reporting for operations teams
2. Offline-capable mobile workflows with background sync
3. Multi-warehouse transfers and reconciliation workflows
4. Role-based access control and audit logging for multi-user environments
5. Accounting integrations and automated deployment support

## Contributing

Contributions are welcome. Please open an issue, create a feature branch, and submit a pull request with a clear summary of the change.

## Documentation

- Architecture guide: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

