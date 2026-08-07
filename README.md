# FlowIQ

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![License: Private](https://img.shields.io/badge/license-private-lightgrey)

FlowIQ is a distributor operations platform designed to manage the daily
workflows that keep a trading business running: stock, billing, customers,
collections, and reporting.

The repository is organized as a monorepo with an Expo application (web-first,
with Android/iOS scaffolding), an Express API, and shared assets and
documentation.

For a deeper architectural overview, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend API](#1-backend-api)
  - [Application](#2-application)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Current Scope](#current-scope)

## Overview

- **Application**: Expo Router, React, TypeScript, NativeWind, React Query,
  and Zustand — runs in the browser by default, with Android/iOS entry points
  available via Expo
- **API layer**: Node.js, Express, TypeScript, and Mongoose
- **Data store**: MongoDB
- **Repository layout**: `mobile/`, `backend/`, `shared/`, `assets/`, and `docs/`

## Features

- **Purchases & stock** — record purchases, snapshot purchase price, and
  automatically track stock movements
- **Customer management** — customer directory with per-customer ledger and
  outstanding balance tracking
- **Billing & invoicing** — generate invoices with automatic stock deduction
  and ledger updates
- **Dashboard** — at-a-glance summary of business activity
- **Supplier & product catalog** — foundational records that power purchases,
  stock, and billing

## Tech Stack

| Layer      | Technologies                                                                 |
| ---------- | ----------------------------------------------------------------------------- |
| Frontend   | Expo Router, React, React Native Web, TypeScript, NativeWind, React Query, Zustand, React Hook Form, Zod |
| Backend    | Node.js, Express, TypeScript, Mongoose, Zod, Helmet, CORS, Morgan             |
| Database   | MongoDB                                                                        |
| Tooling    | ESLint, Prettier, tsx                                                         |

## Project Structure

```
flowiq/
├── mobile/   Expo Router application (web-first, Android/iOS scaffolding)
├── backend/  Express API
├── shared/   Cross-cutting types and utilities
├── assets/   Brand and design reference files
└── docs/     Architecture and implementation notes
```

The `mobile/` folder name is retained for compatibility with the existing
codebase, even though the primary target is currently the web.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB connection string (local instance or a hosted cluster)

### 1. Backend API

```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env` file and set `MONGODB_URI` to your local or hosted
MongoDB connection string.

When the API is running, `GET http://localhost:4000/api/health` returns API
and database status information.

### 2. Application

```bash
cd mobile
npm install
npm run web
```

The app runs in the browser through Expo by default, so Android Studio,
Xcode, and mobile device emulators are not required for day-to-day
development. Use `npm run android` / `npm run ios` if you need to test on a
native platform.

## Environment Variables

| App       | File              | Variable       | Description                          |
| --------- | ----------------- | -------------- | ------------------------------------- |
| `backend` | `backend/.env`     | `MONGODB_URI`  | MongoDB connection string             |
| `mobile`  | `mobile/.env`      | —              | Application-level configuration       |

## Available Scripts

### Backend (`backend/`)

| Command             | Description                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev`         | Runs the API in watch mode                    |
| `npm run build`       | Compiles the API for production               |
| `npm run start`       | Runs the compiled server from `dist/`         |
| `npm run lint`        | Runs ESLint                                   |
| `npm run typecheck`   | Checks the backend with TypeScript            |
| `npm run format`      | Formats backend source files with Prettier    |

### Application (`mobile/`)

| Command             | Description                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev` / `start` | Starts the Expo dev server                 |
| `npm run web`         | Starts the web dev server                     |
| `npm run android`     | Starts the dev server targeting Android       |
| `npm run ios`         | Starts the dev server targeting iOS           |
| `npm run build`       | Creates a static web export                   |
| `npm run lint`        | Runs lint checks                              |
| `npm run typecheck`   | Runs the TypeScript compiler in no-emit mode  |
| `npm run format`      | Formats the codebase with Prettier            |

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
- Application configuration lives in `mobile/.env`.
- This is a private repository; all rights reserved.
