# FlowIQ Architecture

This document outlines the current monorepo structure and the architectural approach behind FlowIQ.

## Monorepo layout

```text
flowiq/
├── mobile/     Expo Router web app (React + react-native-web + TypeScript + NativeWind)
├── backend/    Express + TypeScript + Mongoose API
├── shared/     Cross-cutting types and utilities
├── assets/     Design references and brand assets
└── docs/       Architecture and project documentation
```

The mobile application is currently designed for web-first delivery. It builds through Expo web tooling rather than a native Android or iOS workflow, which keeps the project lightweight and focused on a browser-based operational experience.

## Web app (`mobile/`)

- Routing is handled through Expo Router, with screens under `app/` and presentation logic in `src/screens/`.
- The UI is organized around reusable primitives in `src/components/common/` and domain-specific cards in `src/components/cards/`.
- The design system in `src/theme/` is the single source of truth for spacing, color, typography, and visual treatment.
- State management is split deliberately: React Query manages server state while Zustand stores remain lightweight and structural.
- Data access is implemented through typed API wrappers and query hooks, keeping the application consistent and maintainable.
- The project avoids native-only dependencies where possible, which helps keep the web experience reliable and portable.

## Backend (`backend/`)

The backend follows a layered structure: `routes → controllers → services → repositories → models`, supported by `config`, `middleware`, `utils`, and `validation` directories.

- `src/config/env.ts` loads environment variables in a typed and fail-fast manner.
- `src/config/database.ts` manages the Mongoose connection lifecycle and logging.
- `src/app.ts` assembles the Express application, middleware, and router registration.
- `src/server.ts` connects to MongoDB, seeds initial data where appropriate, and starts the HTTP server.
- Current domain coverage includes health checks, products, suppliers, purchases, stock movements, customers, customer ledgers, invoices, and dashboard summaries.
- Shared model transforms ensure API responses expose a consistent `id` field instead of relying on MongoDB’s default `_id` representation.

## Development conventions

- Sensitive values are loaded from environment configuration rather than hardcoded into the codebase.
- TypeScript strict mode is used throughout both packages.
- The application prioritizes clear, testable service boundaries and consistent response shapes.
- Empty states are treated as legitimate product states rather than fabricated placeholders where appropriate.
