# tRPC Implementation Guide

## Backend Setup

### 1. Install Dependencies

```bash
bun add @trpc/server zod
```

### 2. Create tRPC Context & Procedures

**File: `lib/trpc.ts`**

```typescript
import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "./auth";

// Create context from headers (for session)
export const createContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({ headers: opts.headers });
  return { session };
};

const t = initTRPC.context<typeof createContext>().create();

// Public procedure (anyone can access)
export const publicProcedure = t.procedure;

// Protected procedure (requires authentication)
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user, // Now ctx.user is guaranteed to exist
    },
  });
});

export const router = t.router;
```

### 3. Create Your Routers

**File: `lib/routers/todo.ts`**

```typescript
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { prisma } from "../prisma"; // You'll need to create this

export const todoRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.todo.findMany({
      where: { userId: ctx.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id, userId: ctx.user.id },
      });
      if (!todo) throw new TRPCError({ code: "NOT_FOUND" });
      return todo;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.todo.create({
        data: {
          ...input,
          userId: ctx.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await prisma.todo.update({
        where: { id, userId: ctx.user.id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await prisma.todo.delete({
        where: { id: input.id, userId: ctx.user.id },
      });
      return { success: true };
    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id, userId: ctx.user.id },
      });
      if (!todo) throw new TRPCError({ code: "NOT_FOUND" });

      return await prisma.todo.update({
        where: { id: input.id },
        data: { completed: !todo.completed },
      });
    }),
});
```

### 4. Create Root Router

**File: `lib/routers/_app.ts`**

```typescript
import { router } from "../trpc";
import { todoRouter } from "./todo";

export const appRouter = router({
  todo: todoRouter,
  // Add more routers here as needed
  // user: userRouter,
  // etc...
});

export type AppRouter = typeof appRouter;
```

### 5. Create Expo API Route

**File: `app/api/trpc/[trpc]+api.ts`**

```typescript
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/routers/_app";
import { createContext } from "@/lib/trpc";

export async function GET(request: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: ({ req }) => createContext({ headers: req.headers }),
  });
}

export async function POST(request: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: ({ req }) => createContext({ headers: req.headers }),
  });
}
```

---

## Frontend Setup

### 1. Install Dependencies

```bash
bun add @trpc/client @trpc/react-query @tanstack/react-query
```

**Important:** You install **both** packages:

- `@tanstack/react-query` - The core React Query library
- `@trpc/react-query` - tRPC wrapper that uses TanStack React Query

### 2. Create tRPC Client

**File: `lib/trpc-client.ts`**

```typescript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./routers/_app";

export const trpc = createTRPCReact<AppRouter>();
```

### 3. Create tRPC Provider

**File: `components/TRPCProvider.tsx`**

```typescript
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc-client";
import Constants from "expo-constants";
import { authClient } from "@/lib/auth-client";

const baseURL =
  Constants.expoConfig?.extra?.apiUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:8081";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseURL}/api/trpc`,
          // Pass session headers automatically
          async headers() {
            const session = await authClient.getSession();
            const token = session && "data" in session ? session.data?.session?.token : null;
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 4. Wrap Your App

**File: `app/_layout.tsx`**

```typescript
import { Stack } from "expo-router";
import { TRPCProvider } from "@/components/TRPCProvider";
import "../global.css";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
```

---

## Usage in Components

### Queries (Fetching Data)

```typescript
import { trpc } from "@/lib/trpc-client";

export default function TodosScreen() {
  // Get all todos
  const { data: todos, isLoading, error } = trpc.todo.getAll.useQuery();

  // Get single todo
  const { data: todo } = trpc.todo.getById.useQuery({ id: "123" });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} />}
    />
  );
}
```

### Mutations (Creating/Updating Data)

```typescript
import { trpc } from "@/lib/trpc-client";

export default function CreateTodoScreen() {
  const utils = trpc.useUtils();

  // Create mutation
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch todos list
      utils.todo.getAll.invalidate();
    },
  });

  // Update mutation
  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  // Delete mutation
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const handleCreate = () => {
    createTodo.mutate({
      title: "New Todo",
      description: "Description here",
    });
  };

  return (
    <Pressable onPress={handleCreate}>
      <Text>
        {createTodo.isPending ? "Creating..." : "Create Todo"}
      </Text>
    </Pressable>
  );
}
```

### Optimistic Updates

```typescript
const toggleComplete = trpc.todo.toggleComplete.useMutation({
  // Optimistic update
  onMutate: async ({ id }) => {
    await utils.todo.getAll.cancel();
    const previousTodos = utils.todo.getAll.getData();

    utils.todo.getAll.setData(undefined, (old) =>
      old?.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    return { previousTodos };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    utils.todo.getAll.setData(undefined, context?.previousTodos);
  },
  onSettled: () => {
    utils.todo.getAll.invalidate();
  },
});
```

---

## Key Points

✅ **One React Query**: Install both `@tanstack/react-query` and `@trpc/react-query`
✅ **Type Safety**: Full end-to-end type safety from backend to frontend
✅ **Auto Headers**: Session token automatically sent with every request
✅ **React Query Features**: All TanStack React Query features work (caching, invalidation, optimistic updates)
✅ **Protected Routes**: `protectedProcedure` ensures user is authenticated

## Benefits Over REST

- ✨ **Full Type Safety** - No API contracts, types are shared
- 🚀 **Auto-completion** - Your IDE knows all available procedures
- 🔄 **Request Batching** - Multiple requests sent as one HTTP call
- 📦 **Smaller Bundle** - No need for axios or fetch wrappers
- 🎯 **Better DX** - Refactoring renames across frontend/backend
