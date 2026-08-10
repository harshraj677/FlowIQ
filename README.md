# FlowIQ

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

FlowIQ is a modern operations platform for distributors and trading businesses. It brings purchasing, inventory, invoicing, customer ledger tracking, and reporting into a single, practical workflow designed for speed, clarity, and control.

The project combines a mobile-first Expo experience with a TypeScript-based Express API and a MongoDB-backed data layer to support day-to-day business operations in a simple, scalable way.

For a deeper technical overview, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Why FlowIQ

FlowIQ is built to reduce friction in everyday operations by helping teams:

- streamline purchasing and stock control
- keep invoices and balances accurate with automated financial updates
- monitor outstanding receivables and supplier activity
- access business summaries from a responsive, mobile-friendly interface

## Core capabilities

- purchase and stock management with purchase-price snapshots
- customer directory with per-customer ledger tracking and outstanding balance visibility
- invoicing workflows with automated stock deduction and financial updates
- dashboard summaries for sales, collections, and inventory health
- supplier and product catalog management for procurement and invoicing

## Tech stack

- Mobile frontend: Expo Router, React Native, TypeScript, NativeWind, React Query, Zustand
- Backend API: Node.js, Express, TypeScript, Mongoose, Zod
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

### 1. Backend setup

```bash
cd backend
npm install
```

Create a file named `backend/.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/flowiq
```

Then start the API:

```bash
npm run dev
```

The health endpoint will be available at http://localhost:4000/api/health when the server is running.

### 2. Mobile setup

```bash
cd mobile
npm install
npm run web
```

The Expo app opens in the browser by default. Use `npm run android` or `npm run ios` for device-based testing.

## Environment variables

- `backend/.env` — `MONGODB_URI`: MongoDB connection string
- `mobile/.env` — application-specific configuration when required

## Available scripts

### Backend

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run format`

### Mobile

- `npm run web`
- `npm run android`
- `npm run ios`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run format`

## Architecture

FlowIQ follows a modular monorepo structure with clear separation between the mobile experience, API layer, and shared domain logic. The implementation details are documented in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Roadmap

1. exportable analytics and reporting for operations teams
2. offline-capable mobile workflows with background sync
3. multi-warehouse transfers and reconciliation workflows
4. role-based access control and audit logging for multi-user environments
5. accounting integrations and automated deployment support

## Contributing

Contributions are welcome. If you would like to improve FlowIQ, please open an issue, create a feature branch, and submit a pull request with a clear summary of the change.

## License

FlowIQ is licensed under the ISC License.

