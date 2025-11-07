# Copilot Instructions for Expo Full-Stack Starter

## Architecture Overview

This is a **monolithic full-stack Expo app** where frontend and backend coexist. The backend runs as Expo API routes (`/app/api/`), providing type-safe RPC via tRPC. Type safety flows automatically: `Prisma Schema → tRPC Router → React Query Hooks → UI`.

## Critical Patterns

### 1. Authentication Flow

**Session Management**: Better Auth with Prisma adapter. Sessions stored in SecureStore (native) or cookies (web).

**URL Scheme Requirement**: The scheme in `app.json` (`"expofullstackstarter"`) must match `trustedOrigins` in `/lib/auth.ts`. Cookies are manually forwarded on native via headers in `TRPCProvider.tsx`:

```typescript
headers() {
  const cookies = authClient.getCookie();
  if (cookies) headers.set("Cookie", cookies);
}
```

**Protected Routes**: Use `protectedProcedure` in tRPC routers. It throws `UNAUTHORIZED` if no session exists and injects `ctx.user` (guaranteed to exist in procedure body).

### 2. tRPC API Layer

**Router Pattern** (see `/lib/routers/todo.ts`):

```typescript
export const myRouter = router({
  getData: protectedProcedure
    .input(z.object({ id: z.string() })) // Zod validation mandatory
    .query(async ({ ctx, input }) => {
      return prisma.model.findMany({
        where: { userId: ctx.user.id }, // ALWAYS scope by userId
      });
    }),
});
```

Register in `/lib/routers/_app.ts`:

```typescript
export const appRouter = router({
  myRouter: myRouter, // Add here
});
```

**Client Usage**: Auto-generated hooks from router types:

```typescript
const { data } = trpc.myRouter.getData.useQuery({ id: "123" });
```

### 3. Optimistic Updates Pattern

**Canonical Example** (`/app/(tabs)/(todos)/index.tsx`):

```typescript
const mutation = trpc.todo.toggleComplete.useMutation({
  onMutate: async ({ id }) => {
    await utils.todo.getAll.cancel();
    const previousData = utils.todo.getAll.getData();
    utils.todo.getAll.setData(undefined, (old) =>
      old?.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    return { previousData };
  },
  onError: (_, __, context) => {
    utils.todo.getAll.setData(undefined, context?.previousData);
  },
  onSettled: () => utils.todo.getAll.invalidate(),
});
```

**Key Steps**: Cancel in-flight queries → save previous data → optimistically update → rollback on error → refetch on settle.

### 4. State Management with Zustand

**Persistence Pattern** (`/lib/stores/preferences.ts`):

```typescript
export const usePreferencesStore = create<State>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        set({ language });
        i18n.changeLanguage(language); // Sync external state
      },
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Re-sync external state after hydration
        if (state?.language) i18n.changeLanguage(state.language);
      },
    }
  )
);
```

**Critical**: When persisting state that controls external systems (i18n, NativeWind), update external state in both the setter AND `onRehydrateStorage` to handle app restarts.

### 5. Database Access Rules

- **Single Prisma Instance**: Always import from `/lib/prisma.ts` (singleton prevents connection exhaustion)
- **User Scoping**: EVERY user-owned query MUST include `where: { userId: ctx.user.id }`
- **Relations**: Use compound where clauses: `where: { id: input.id, userId: ctx.user.id }`
- **Includes**: Fetch related data with `include: { category: true }`

### 6. Styling with NativeWind v4

- Use `className` prop: `className="bg-gray-50 dark:bg-gray-900"`
- FlatList/ScrollView: Use `contentContainerClassName` instead of `className`
- Dynamic colors: Use inline `style` prop (e.g., `style={{ color: category.color }}`)
- Dark mode: Prefix utilities with `dark:` (e.g., `dark:text-white`)

## Development Workflows

### Starting Development

```powershell
bun install
docker compose up -d  # MySQL + observability
bun start
```

### Database Migrations

```powershell
# After editing prisma/schema.prisma:
npx prisma migrate dev --name add_field_name
npx prisma generate  # Updates TypeScript types
```

### Better Auth Schema Updates

```powershell
# After adding Better Auth features:
bunx @better-auth/cli generate
npx prisma migrate dev --name update_auth
```

### Environment Setup

- Copy `.env.example` to `.env`
- **Critical**: `BETTER_AUTH_SECRET` must be 32+ characters (generate: `openssl rand -base64 32`)
- `EXPO_PUBLIC_API_URL`: `http://localhost:8081` (default for local dev)
- `DATABASE_URL`: `mysql://root:password@localhost:3306/todoapp` (default Docker setup)

## File Organization

### API Routes (`/app/api/`)

- `auth/[...auth]+api.ts`: Better Auth endpoints (all auth operations)
- `trpc/[trpc]+api.ts`: tRPC handler (all RPC calls route here)

### Routers (`/lib/routers/`)

- One file per domain entity (`todo.ts`, `category.ts`)
- Export typed router, register in `_app.ts`

### App Structure (`/app/`)

```
app/
├── _layout.tsx              # Root layout (providers, navigation container)
├── (auth)/                  # Public routes (unauthenticated users)
│   ├── _layout.tsx          # Auth layout wrapper
│   ├── login.tsx            # Login screen
│   └── register.tsx         # Register screen
├── (tabs)/                  # Protected routes (authenticated users)
│   ├── _layout.native.tsx   # Native tab navigation
│   ├── _layout.tsx          # Web tab navigation
│   ├── (todos)/             # Todos feature
│   │   ├── _layout.tsx      # Todos stack layout
│   │   └── index.tsx        # Todos list screen
│   └── profile/             # Profile feature
│       ├── _layout.tsx      # Profile stack layout
│       └── index.tsx        # Profile screen
└── api/                     # API routes (backend)
    ├── auth/
    │   └── [...auth]+api.ts # Better Auth handler
    └── trpc/
        └── [trpc]+api.ts    # tRPC handler
```

**Route Organization Rules**:

- Folders in parentheses `(name)` are route groups (don't appear in URL)
- `_layout.tsx` defines the container for child routes
- Platform-specific layouts: `_layout.native.tsx` (iOS/Android), `_layout.tsx` (web)
- `index.tsx` is the default route for a folder
- Files with `+api.ts` suffix are API endpoints (backend)

### Components Structure (`/components/`)

```
components/
├── AuthWrapper.tsx          # Session loader, redirects on auth state
├── TRPCProvider.tsx         # tRPC + React Query setup with cookie forwarding
├── auth/                    # Authentication screens (presentation)
│   ├── LoginScreen.tsx      # Login form with OAuth buttons
│   └── RegisterScreen.tsx   # Registration form
├── elements/                # Reusable UI primitives
│   ├── Button.tsx           # Styled button component
│   ├── ErrorMessage.tsx     # Error display component
│   └── FormTextInput.tsx    # Text input with label
└── todos/                   # Todo feature components
    ├── CategorySelectorBadge.tsx  # Category pill with color
    ├── CreateCategoryModal.tsx    # Modal for new categories
    └── CreateTodoForm.tsx         # Todo creation form
```

**Component Organization Rules**:

- Root-level: Infrastructure components (providers, wrappers)
- Feature folders: Domain-specific components (`auth/`, `todos/`)
- `elements/`: Generic reusable UI components
- Co-locate components with their feature when possible

## Common Pitfalls

1. **Missing userId filter**: All protected queries need `where: { userId: ctx.user.id }`
2. **Metro config**: Must have `unstable_enablePackageExports: true` for Better Auth
3. **Cookie forwarding**: Native platforms require manual cookie forwarding in `TRPCProvider.tsx`
4. **URL scheme mismatch**: `app.json` scheme must match `trustedOrigins` in `/lib/auth.ts`
5. **Forgetting invalidation**: After mutations, call `utils.routerName.procedureName.invalidate()`

## Adding New Features

### New Data Model

1. Add model to `prisma/schema.prisma` with `userId` foreign key
2. Run `npx prisma migrate dev --name add_model`
3. Create router in `/lib/routers/model.ts` with CRUD procedures
4. Register in `/lib/routers/_app.ts`
5. Use auto-generated `trpc.model.*` hooks in components

### New tRPC Router

1. Create `/lib/routers/feature.ts`:

```typescript
export const featureRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.feature.findMany({ where: { userId: ctx.user.id } });
  }),
});
```

2. Register in `/lib/routers/_app.ts`:

```typescript
export const appRouter = router({
  feature: featureRouter,
});
```

3. Use in components: `trpc.feature.list.useQuery()`

### New OAuth Provider

1. Update `/lib/auth.ts` with provider config
2. Run `bunx @better-auth/cli generate`
3. Run migration: `npx prisma migrate dev --name add_oauth`
4. Add provider button to `/app/(auth)/login.tsx`

## Key Dependencies

- **Expo Router**: File-based routing (folders = routes, `_layout.tsx` = containers)
- **Better Auth**: Session management via cookies/SecureStore
- **tRPC**: Type-safe API layer with React Query integration
- **Prisma**: ORM with MySQL (adapter for Better Auth)
- **NativeWind v4**: Tailwind CSS for React Native (requires RN 0.78+)
- **Zustand**: Client state (theme, language) with AsyncStorage persistence

## Debugging Tips

- **tRPC errors**: Check Metro console for error codes and messages
- **Auth failures**: Verify `BETTER_AUTH_SECRET` is set and URL scheme matches
- **DB connection**: Ensure Docker MySQL is running (`docker compose ps`)
- **Type mismatches**: Run `npx prisma generate` after schema changes
- **Missing session**: Check cookie forwarding in `TRPCProvider.tsx` headers

## Project Status

✅ **Working**: Auth, tRPC, todos CRUD, categories, i18n, theme switching  
🚧 **Planned**: Testing (Jest, Storybook, Maestro), observability (OTel)

**Focus**: Maintain end-to-end type safety. All data flows through tRPC with Zod validation.
