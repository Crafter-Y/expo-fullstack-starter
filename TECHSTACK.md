## **💻 Frontend (Expo / React Native)**

### **Core Frameworks**

- **React Native + Expo** → app framework.
- **Expo Router** → file-based routing.
- **NativeWind / Tailwind** → styling.

### **Authentication**

- **Better Auth (Expo API/Server)** → handles authentication & session management.

### **State Management**

- **tRPC hooks** → primary data fetching & caching.
- **Zustand** → client-side state (theme, preferences).
  - Optional: persist to AsyncStorage for session-long or longer persistence.

### **Data Fetching & API**

- **tRPC** → typed client-server communication.
- Public & protected procedures:
  - `publicProcedure` → open API routes.
  - `protectedProcedure` → requires authenticated user (`Better Auth` session).

- **React Query (via tRPC)** → caching, refetching, background updates.

### **Internationalization**

- **i18n / react-i18next** → client-side localization.

### **Frontend Testing**

1. **Storybook** → component isolation.
2. **Visual Regression** → Lost Pixel (self-hosted) for snapshot testing of Storybook stories.
3. **Unit & Integration Tests** → Jest + React Native Testing Library.
4. **End-to-End (E2E)** → Maestro for user flows on iOS and Android.
5. **tRPC / Backend Mocks** → Prismock or Jest mocks for testing without real backend.

### **Observability / Telemetry**

- **OpenTelemetry (OTel)** → client-side and server-side tracing.
- **Backend traces** connected to frontend spans.
- Client-side sampling: e.g., 5% default, 100% on errors.
- Session-based tracing with `sessionId`.
- Short-lived spans for user interactions.
- Optional batching: send traces to a backend endpoint (Tempo / Loki).

---

## **🖥️ Backend (Node.js / tRPC / Better Auth)**

### **Core Frameworks**

- **tRPC** → API router, typed endpoints.
- **Better Auth** → authentication & session handling.
- **Node.js / TypeScript** → backend runtime.

### **Database**

- **Prisma ORM** → database access layer.
- **MySQL** → production database.
- **Prisma schema** → includes Better Auth tables + your custom tables.
- **Testing**:
  - Unit tests → Prismock or mocked Prisma for tRPC endpoints.
  - Integration tests → optional temporary MySQL / SQLite DB.

### **API Design**

- **Context per request** → includes `session` from Better Auth.
- **Public / Protected procedures** → enforce authentication.

### **Observability / Telemetry**

- **OpenTelemetry** → server-side tracing.
- **Connected traces** → backend spans linked to frontend spans.
- **Sampling rules** → e.g., 5% default, 100% for errors.

### **Testing**

- **Jest + Prismock** → unit tests for tRPC procedures.
- **TRPC procedure testing**:
  - Public → test data returned correctly.
  - Protected → test authorization & user context.

- **Input validation tests** → Zod schemas.

---

## **🛠️ CI / DevOps / Workflow**

- **Github Actions CI/CD** → pipeline to run:
  - Linting & unit tests (frontend & backend)
  - Storybook build
  - Visual regression tests (Lost Pixel)
  - E2E tests (Maestro)

- **Docker / optional** → backend services, databases for integration testing.

---

### ✅ **Key Benefits of This Stack**

- **Full type safety** end-to-end (tRPC + TypeScript).
- **Frontend-first development** with Storybook + Lost Pixel.
- **Robust testing**:
  - Unit → Jest + tRPC mocks.
  - Visual → Lost Pixel.
  - E2E → Maestro.

- **Scalable & maintainable architecture**:
  - Frontend caches with tRPC/React Query.
  - Backend handles auth + Prisma ORM cleanly.

- **Observability**: traces connect client → backend → errors captured efficiently.
