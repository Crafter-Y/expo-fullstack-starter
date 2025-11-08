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

### 7. Component Architecture Pattern

**Separation of Concerns**: Route files contain business logic, components are presentation-only.

**Route File Pattern** (`/app/(tabs)/profile/index.tsx`):

- Contains all hooks (`useSession`, `useState`, custom hooks)
- Manages business logic (handlers, state transformations)
- Performs data fetching and mutations
- Passes data and callbacks as props to presentation components

**Presentation Component Pattern** (`/components/profile/ProfileScreen.tsx`):

- Receives all data via props (no hooks except `useTranslation` for labels)
- Pure rendering logic only
- No state management or side effects
- Accepts callbacks via props (`onPress`, `onSubmit`, etc.)

**Example Structure**:

```typescript
// Route file (index.tsx) - Business Logic
export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    // Business logic here
  };

  return <ProfileScreen data={session} onAction={handleAction} />;
}

// Component file - Presentation Only
interface ProfileScreenProps {
  data?: Session;
  onAction: () => void;
}

export function ProfileScreen({ data, onAction }: ProfileScreenProps) {
  const { t } = useTranslation(); // Only i18n hook allowed
  return <Button onPress={onAction}>{data?.name}</Button>;
}
```

**When to Extract Components**:

- Repeated UI patterns (4+ similar elements)
- Clear visual/functional boundaries
- Reusable across features

### 8. Conditional Component Logic

**Dynamic Container Pattern**: Use component type as variable for conditional rendering.

```typescript
// Example: ProfileInfoField - Pressable if interactive, View if static
const Container = onPress ? Pressable : View;
const containerClassName = onPress
  ? "active:bg-gray-50 dark:active:bg-gray-700"  // Interactive states
  : "bg-white dark:bg-gray-800";                  // Static styles

return (
  <Container className={containerClassName} onPress={onPress}>
    {/* content */}
  </Container>
);
```

**Benefits**: Single component handles both static and interactive states without duplication.

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
├── (auth)/                  # Public routes (login, register)
├── (tabs)/                  # Protected routes (todos, profile)
│   ├── _layout.native.tsx   # Native tab navigation
│   ├── _layout.tsx          # Web tab navigation
│   ├── (todos)/
│   │   └── index.tsx        # Todos list screen
│   └── profile/
│       └── index.tsx        # Profile screen
└── api/                     # Backend API routes
    ├── auth/[...auth]+api.ts
    └── trpc/[trpc]+api.ts
```

**Key Rules**:

- `(name)` folders are route groups (don't appear in URL)
- `_layout.tsx` defines containers for child routes
- `.native.tsx` for iOS/Android, `.tsx` for web
- `+api.ts` suffix for API endpoints

### Components Structure (`/components/`)

```
components/
├── AuthWrapper.tsx          # Session loader, auth redirects
├── TRPCProvider.tsx         # tRPC + React Query setup
├── auth/                    # Auth UI (LoginScreen, RegisterScreen)
├── elements/                # Generic reusable UI
│   ├── Button, ErrorMessage, FormTextInput
│   ├── FormIconSelector, FormColorSelector
│   ├── LoadingScreen, ModalWrapper, ModalHeader
├── profile/                 # Profile feature
│   ├── ProfileScreen.tsx
│   └── ProfileInfoField.tsx
└── todos/                   # Todos feature
    ├── CategorySelectorBadge, CategoryFormModal
    ├── CreateTodoForm, TodoItem
```

**Organization Rules**:

- Feature folders for domain components (`auth/`, `todos/`, `profile/`)
- `elements/` for generic cross-feature components

## Common Pitfalls

1. **Missing userId filter**: All protected queries need `where: { userId: ctx.user.id }`
2. **Cookie forwarding**: Native platforms require manual cookie forwarding in `TRPCProvider.tsx`
3. **URL scheme mismatch**: `app.json` scheme must match `trustedOrigins` in `/lib/auth.ts`
4. **Forgetting invalidation**: After mutations, call `utils.routerName.procedureName.invalidate()`
5. **Business logic in components**: Keep hooks and state in route files, components should be presentation-only

## Adding New Features

### New Data Model

1. Add model to `prisma/schema.prisma` with `userId` foreign key
2. Run `npx prisma migrate dev --name add_model`
3. Create router in `/lib/routers/model.ts` with CRUD procedures
4. Register in `/lib/routers/_app.ts`
5. Use auto-generated `trpc.model.*` hooks in components

## Key Dependencies

- **Expo Router**: File-based routing
- **Better Auth**: Session management via cookies/SecureStore
- **tRPC**: Type-safe API layer with React Query
- **Prisma**: ORM with MySQL
- **NativeWind v4**: Tailwind CSS for React Native
- **Zustand**: Client state with AsyncStorage persistence
