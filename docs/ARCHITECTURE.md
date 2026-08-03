# FlowIQ Architecture

## Monorepo layout

```
flowiq/
├── mobile/     Expo Router web app (React + react-native-web + TypeScript + NativeWind)
├── backend/    Express + TypeScript + Mongoose API
├── shared/     Cross-cutting types (empty until needed)
├── assets/     Design references / brand source files
└── docs/       This file
```

`mobile/` targets **web only** — it builds via `expo start --web` /
`expo export --platform web` (react-native-web under the hood), with no
Android/iOS native build, Gradle, Xcode, or emulator involved.

## Web app (`mobile/`)

- **Routing**: Expo Router (`app/`). Tab screens live in `app/(tabs)/`; the
  layout renders a `Slot` plus a custom `BottomTabBar` (see
  `src/navigation/`) instead of the built-in `Tabs` primitive, so the
  elevated center "Bill" button can be pixel-matched to the approved
  mockup without fighting a wrapped navigator component. The mobile-style
  chrome (bottom tab bar, phone-width layout) is intentional — this is a
  "mobile web" experience rendered in the browser, not a desktop redesign.
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
  SegmentedToggle, DateField, Checkbox). `src/components/cards/` are
  domain-shaped display components (StatCard, CustomerCard, InvoiceCard,
  ProductCard, StockCard). All list screens use React Native's built-in
  `FlatList` rather than `@shopify/flash-list`, which has inconsistent web
  support.
- **State**: Zustand stores in `src/store/` (`src/store/*Store.ts`) stay
  structural placeholders (`items` / `isLoading` / `error` via
  `createEntityStore`) — server state is owned by React Query, not Zustand,
  throughout this app.
- **Data**: `src/api/*.ts` are typed fetch wrappers per resource
  (products, purchases, customers, invoices, ...); `src/hooks/use*.ts` wrap
  them in React Query with consistent cache-key/invalidation conventions;
  `src/services/queryClient.ts` configures the client.
- **Path aliases**: `@/*`, `@components/*`, `@screens/*`, `@navigation/*`,
  `@hooks/*`, `@services/*`, `@api/*`, `@store/*`, `@constants/*`,
  `@theme/*`, `@types/*`, `@utils/*`, `@assets/*` — configured in
  `tsconfig.json`, resolved by Metro automatically (Metro is the bundler
  for both dev and static web export).
- **No native-only APIs**: date entry is a plain validated text field (not
  a native picker), and nothing in the component tree assumes
  `@react-native-community/datetimepicker` or other native-module-backed
  packages exist.

## Backend (`backend/`)

Layered structure: `routes → controllers → services → repositories → models`,
plus `config`, `middleware`, `utils`, `validation` (Zod schemas per resource).

- `src/config/env.ts` — typed env loading via `dotenv`, fails fast on
  missing required vars.
- `src/config/database.ts` — Mongoose connection + lifecycle logging.
- `src/app.ts` — Express app assembly (helmet, cors, json body parsing,
  morgan logging, `/api` router mount, 404 + error handlers).
- `src/server.ts` — connects to MongoDB, seeds default products/supplier,
  then starts the HTTP listener.
- Resources implemented so far: health, products, suppliers, purchases,
  stock movements, customers (+ customer ledger), invoices, dashboard
  summary. Every model uses a shared `toJSON` transform (`src/models/plugins.ts`)
  so API responses expose `id` (not Mongo's `_id`) consistently.

## Conventions

- No hardcoded secrets — both apps read from `.env` (see `.env.example` in
  each package).
- TypeScript `strict` everywhere; both packages have `typecheck`, `lint`,
  and `format` scripts.
- Screens without an approved mockup use `EmptyState` copy instead of
  fabricated data; empty states that are still legitimately empty (e.g. a
  ledger before any bills exist) render the same way, not a placeholder.
