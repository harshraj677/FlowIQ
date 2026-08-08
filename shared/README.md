# shared

The `shared/` folder hosts cross-cutting code that is consumed by both the API and the mobile application. Keeping domain types, validation schemas, and shared utilities here prevents duplication and reduces integration bugs.

What belongs here

- TypeScript domain types and interfaces used by both `mobile/` and `backend/`.
- Shared validation schemas (Zod/JSON Schema) and constants.
- Lightweight utilities that do not depend on runtime platform specifics.

Best practices

- Keep this folder minimal and stable; changes to shared types can require coordinated migrations.
- Prefer versioned exports and clear migration notes when changing core types.
- Add tests that validate the shared contracts used by each consumer.

Suggested next steps

- Add a small `README`-backed contract: an exported version constant and migration notes.
- Add a `tests/` folder with contract tests that run against both consumers in CI.
