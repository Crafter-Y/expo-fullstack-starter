# AGENTS.md

> [!IMPORTANT]
> **Single source of truth** for AI agents.

## 1. Stack & Architecture

**Monolithic Expo App**: Frontend (React Native/Expo) + Backend (Node.js/tRPC) in `app/api/*`.

- **Stack**: Expo SDK 54+, TypeScript, NativeWind v4, tRPC + React Query, Better Auth (Prisma), MySQL.
- **State**: Server (React Query), Client (Zustand + AsyncStorage).
- **Testing**: Vitest, RN Testing Library, Maestro.

## 2. Critical Patterns

### Authentication

- **Better Auth**: Sessions in DB. Middleware in `app/(tabs)` checks session.
- **Native**: Manually forward cookies in `TRPCProvider.tsx`.
- **Usage**: `authClient` (client), `auth` (server).

### tRPC API

- **Routers**: `lib/routers/*.ts`. Aggregated in `_app.ts`.
- **Procedures**:
  - `publicProcedure`: Open.
  - `protectedProcedure`: Auth required. Injects `ctx.user`.
- **Rules**: ALL user data queries MUST use `where: { userId: ctx.user.id }`.

### Styling (NativeWind v4)

- Use `className`.
- **Dark Mode**: `dark:` prefix.
- **Dynamic**: Inline `style` for user values.

## 3. Directory Structure

- `app/`: Pages & API routes (`api/`).
- `components/`: Presentation only. No business logic.
- `lib/`: Shared logic (`routers/`, `hooks/`, `stores/`).
- `prisma/`: Schema & migrations.

## 4. Development Rules

- **Do**: Use `zod` for validation. Run `npx prisma migrate dev` on schema changes.
- **Don't**: Import server code in client. Use `StyleSheet`. Hardcode colors.

### Commands

- **Setup**: `bun install`, `docker compose up -d`, `bun start`
- **Test**: `bun run test:coverage` (Vitest)
- **Lint**: `bun run lint`
- **Storybook**: `bun run start:storybook` (Dev), `bun run build-storybook` (Build)
- **Auth**: `bun run db:generate` (Better Auth schema)
