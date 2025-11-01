# Copilot Instructions for Expo Full-Stack Starter

## Architecture Overview

This is a **monolithic full-stack Expo app** where frontend and backend live in the same codebase. The backend runs as Expo API routes (`/app/api/`), providing type-safe RPC via tRPC.

**Key Pattern**: Type safety flows from database → tRPC procedures → React hooks automatically. No manual API client code or type definitions needed.

### Data Flow

```
Prisma Schema → tRPC Router → React Query Hooks → UI Components
      ↑                           ↓
   MySQL DB              Better Auth Session
```

## Critical Patterns

### 1. Authentication Architecture

**Server-side** (`/lib/auth.ts`):

- Better Auth configured with Prisma adapter for MySQL
- Uses `expo()` plugin for mobile-first authentication
- Session management happens automatically via cookies/SecureStore

**Client-side** (`/lib/auth-client.ts`):

- Uses `expoClient` plugin with SecureStore for secure session caching
- URL scheme from `app.json` must match `trustedOrigins` in server config
- Cookie forwarding in tRPC client (`TRPCProvider.tsx`) enables authenticated requests

**Protected Routes**: Use `protectedProcedure` in tRPC routers - it throws `UNAUTHORIZED` if no session exists.

### 2. tRPC API Layer

**Creating New Endpoints** (example: `/lib/routers/todo.ts`):

```typescript
// Always use protectedProcedure for user-scoped data
export const myRouter = router({
  getData: protectedProcedure
    .input(z.object({ id: z.string() })) // Zod validation required
    .query(async ({ ctx, input }) => {
      // ctx.user is typed and guaranteed to exist
      return prisma.model.findMany({
        where: { userId: ctx.user.id }, // Always scope by userId!
      });
    }),
});
```

**Register in** `/lib/routers/_app.ts`:

```typescript
export const appRouter = router({
  todo: todoRouter,
  myRouter: myRouter, // Add here
});
```

**Client Usage**: Hooks are auto-generated from router types:

```typescript
const { data, isLoading } = trpc.myRouter.getData.useQuery({ id: "123" });
```

### 3. Database Access

- **Single Prisma instance**: Import from `/lib/prisma.ts` (singleton pattern prevents connection exhaustion)
- **Always filter by userId**: Every user-scoped query must include `where: { userId: ctx.user.id }`
- **Migrations**: Run `npx prisma migrate dev --name description` after schema changes
- **Relations**: Use `include` for nested data (e.g., `include: { category: true }`)

### 4. Optimistic Updates Pattern

See `/app/(tabs)/(todos)/index.tsx` for the canonical example:

```typescript
const mutation = trpc.todo.toggleComplete.useMutation({
  onMutate: async ({ id }) => {
    await utils.todo.getAll.cancel();  // Cancel in-flight queries
    const previousData = utils.todo.getAll.getData();
    utils.todo.getAll.setData(undefined, (old) => /* update optimistically */);
    return { previousData };  // Rollback data
  },
  onError: (err, variables, context) => {
    utils.todo.getAll.setData(undefined, context?.previousData);  // Rollback
  },
  onSettled: () => {
    utils.todo.getAll.invalidate();  // Refetch from server
  },
});
```

### 5. Styling with NativeWind

- Use `className` prop with Tailwind utilities: `className="flex-1 bg-gray-50 dark:bg-gray-900"`
- Dark mode: Prefix with `dark:` (e.g., `dark:text-white`)
- **Important**: Use `contentContainerClassName` for FlatList/ScrollView, not `className`
- Platform-specific styles: Use inline `style` prop sparingly for dynamic values

## Development Workflows

### Starting Development

```bash
bun install
docker compose up -d  # Start MySQL + observability stack
bun start
```

### Database Migrations

```bash
# After changing prisma/schema.prisma:
npx prisma migrate dev --name add_field_name
npx prisma generate  # Updates TypeScript types
```

### Better Auth Schema Updates

```bash
# After adding Better Auth features (OAuth, 2FA, etc.):
bunx @better-auth/cli generate
npx prisma migrate dev --name update_auth
```

### Environment Setup

- Copy `.env.example` to `.env`
- **Critical**: `BETTER_AUTH_SECRET` must be 32+ random characters
- `EXPO_PUBLIC_API_URL` defaults to `http://localhost:8081` for local dev
- Database URL format: `mysql://user:password@host:port/database`

## File Organization Conventions

### API Routes (`/app/api/`)

- `[...auth]+api.ts`: Better Auth endpoints (login, register, session)
- `[trpc]+api.ts`: tRPC endpoint handler (all RPC calls go here)

### Routers (`/lib/routers/`)

- One router per domain entity (e.g., `todo.ts`, `category.ts`)
- Export typed router, import in `_app.ts`

### Screens (`/app/`)

- `(auth)/`: Unauthenticated routes (login, register)
- `(tabs)/`: Main app navigation with bottom tabs
- Use `_layout.tsx` for nested navigation configuration

### Components (`/components/`)

- Modals should accept `visible` and `onClose` props
- Use `Pressable` instead of `TouchableOpacity` (better performance)

## Common Pitfalls

1. **Forgetting userId scoping**: Always add `where: { userId: ctx.user.id }` in protected queries
2. **Metro config**: `unstable_enablePackageExports: true` is required for Better Auth to work
3. **Session cookies**: On native, cookies are manually forwarded via headers in `TRPCProvider.tsx`
4. **Query invalidation**: Use `utils.routerName.procedureName.invalidate()` after mutations
5. **Zod schemas**: Input validation is mandatory - never accept untyped input

## Testing Strategy (Per TECHSTACK.md)

- **Unit tests**: Mock Prisma with Prismock for tRPC procedure testing
- **E2E tests**: Maestro for critical flows (auth, CRUD operations)
- **Visual regression**: Storybook + Lost Pixel (future)
- **Test protected procedures**: Mock `ctx.user` in tRPC context

## Adding New Features

### New Data Model

1. Add model to `prisma/schema.prisma` with `userId` relation
2. Run migration: `npx prisma migrate dev --name add_model`
3. Create router in `/lib/routers/model.ts` with CRUD operations
4. Register router in `/lib/routers/_app.ts`
5. Create UI components and hook up `trpc.model.*` queries/mutations

### New Auth Provider (OAuth)

1. Update `/lib/auth.ts` with Better Auth provider config
2. Run `bunx @better-auth/cli generate` to update schema
3. Add provider buttons to `/app/(auth)/login.tsx`
4. Test redirect URLs match `trustedOrigins` + URL scheme

## Dependencies to Know

- **Expo Router**: File-based routing (folders = route segments, `_layout.tsx` = navigation containers)
- **React Query**: Powers tRPC caching (stale time, refetch logic in `TRPCProvider.tsx`)
- **Better Auth**: Handles sessions via cookies (SecureStore on mobile, httpOnly on web)
- **NativeWind v4**: Requires React Native 0.78+ and specific babel config

## Debugging Tips

- **tRPC errors**: Check browser/metro console for detailed error messages with codes
- **Auth issues**: Verify `BETTER_AUTH_SECRET` is set and scheme matches `app.json`
- **Database connection**: Ensure Docker MySQL is running (`docker compose ps`)
- **Type errors**: Run `npx prisma generate` after schema changes to update types
- **Missing session**: Check that cookies are forwarded in `TRPCProvider` headers

## Current State (Per ROADMAP.md)

✅ **Completed**: Backend foundation, auth, tRPC, todo CRUD, categories, styling  
🚧 **In Progress**: Testing infrastructure, observability  
📋 **Planned**: i18n, offline support, advanced features

Focus on maintaining type safety and following established patterns for consistency.
