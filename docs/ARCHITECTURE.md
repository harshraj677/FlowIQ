# FlowIQ Architecture (Phase 1)

## Monorepo layout

```
flowiq/
├── mobile/     Expo Router app (React Native + TypeScript + NativeWind)
├── backend/    Express + TypeScript + Mongoose API
├── shared/     Cross-cutting types (empty until Phase 2)
├── assets/     Design references / brand source files
└── docs/       This file
```

## Mobile (`mobile/`)

- **Routing**: Expo Router (`app/`). Tab screens live in `app/(tabs)/`; the
  layout renders a `Slot` plus a custom `BottomTabBar` (see
  `src/navigation/`) instead of the built-in `Tabs` primitive, so the
  elevated center "Bill" button can be pixel-matched to the approved
  mockup without fighting a wrapped navigator component.
- **Screens** (`src/screens/`) hold all real UI; files under `app/` are thin
  wrappers that just import and re-export a screen component. This keeps
  routing and presentation decoupled.
- **Design system** (`src/theme/`): `colors.ts`, `typography.ts`,
  `spacing.ts`, `shadows.ts` are the single source of truth — no hex codes
  or magic numbers should appear outside this folder. `ThemeProvider`
  exposes the same values through `useTheme()` for contexts where NativeWind
  classes aren't convenient (SVG fills, dynamic inline styles).
- **Components**: `src/components/common/` are generic primitives (Button,
  Card, Input, Dropdown, SearchBar, BottomSheet, ConfirmDialog, EmptyState,
  Skeleton, SectionHeader, ScreenHeader, Badge, QuantityStepper,
  SegmentedToggle). `src/components/cards/` are domain-shaped display
  components (StatCard, CustomerCard, InvoiceCard, ProductCard) — they
  accept props and render nothing without data; screens decide when to show
  them vs. an `EmptyState`.
- **State**: Zustand stores in `src/store/` are structural only in Phase 1
  (`items` / `isLoading` / `error` shape via `createEntityStore`). Domain
  actions and API wiring land with each module's business logic.
- **Data**: `src/api/client.ts` is a minimal fetch wrapper; `src/services/queryClient.ts`
  configures React Query. No endpoints are called yet.
- **Path aliases**: `@/*`, `@components/*`, `@screens/*`, `@navigation/*`,
  `@hooks/*`, `@services/*`, `@api/*`, `@store/*`, `@constants/*`,
  `@theme/*`, `@types/*`, `@utils/*`, `@assets/*` — configured in
  `tsconfig.json`, resolved by Metro automatically.

## Backend (`backend/`)

Layered structure: `routes → controllers → services → repositories → models`.
Only `routes`, `controllers` (health check) and `config`/`middleware`/`utils`
are populated in Phase 1; `models`, `services`, `repositories`, `validation`
are empty folders reserved for the first real module.

- `src/config/env.ts` — typed env loading via `dotenv`, fails fast on
  missing required vars.
- `src/config/database.ts` — Mongoose connection + lifecycle logging.
- `src/app.ts` — Express app assembly (helmet, cors, json body parsing,
  morgan logging, `/api` router mount, 404 + error handlers).
- `src/server.ts` — connects to MongoDB, then starts the HTTP listener.
- `GET /api/health` — the only route in Phase 1; reports process status and
  live Mongoose connection state so DB connectivity can be verified without
  any CRUD.

## Conventions

- No hardcoded secrets — both apps read from `.env` (see `.env.example` in
  each package).
- TypeScript `strict` everywhere; both packages have `typecheck`, `lint`,
  and `format` scripts.
- No business logic, CRUD endpoints, or fake/sample data in Phase 1 —
  screens without an approved mockup use `EmptyState` copy instead.
