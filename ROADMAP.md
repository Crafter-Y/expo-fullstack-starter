## **🗺️ Implementation Roadmap: Full-Stack Expo Todo App Starter**

### **Phase 0: Project Foundation & Setup** ⚙️

**Goal:** Set up core infrastructure and tooling incrementally

#### **0.1 NativeWind Setup**

- [x] Install NativeWind v4 and dependencies (`nativewind`, `tailwindcss`)
- [x] Create `tailwind.config.js` with content paths
- [x] Update `babel.config.js` to include NativeWind preset
- [x] Test basic styling on a component

#### **0.2 Prisma Setup**

- [ ] Install Prisma CLI and client (`prisma`, `@prisma/client`)
- [ ] Install database driver (e.g., `@prisma/adapter-libsql` for Turso, or MySQL driver)
- [ ] Initialize Prisma with `bunx prisma init`
- [ ] Configure `.env` with `DATABASE_URL`
- [ ] Test Prisma connection

#### **0.3 Better Auth Dependencies**

- [ ] Install Better Auth (`better-auth`)
- [ ] Install required auth adapters

#### **0.4 tRPC Dependencies**

- [ ] Install tRPC server packages (`@trpc/server`)
- [ ] Install tRPC client packages (`@trpc/client`, `@trpc/react-query`)
- [ ] Install React Query (`@tanstack/react-query`)
- [ ] Install Zod for input validation (`zod`)

#### **0.5 Zustand Setup**

- [ ] Install Zustand (`zustand`)
- [ ] Install AsyncStorage for persistence (`@react-native-async-storage/async-storage`)
- [ ] Create placeholder stores:
  - `/stores/authStore.ts`
  - `/stores/uiStore.ts`

#### **0.6 i18next Setup**

- [ ] Install i18next packages (`react-i18next`, `i18next`)
- [ ] Install Expo localization (`expo-localization`)
- [ ] Create `/locales` folder structure:
  - `/locales/en.json` (primary language)
  - `/locales/de.json`
- [ ] Create i18n config file at `/lib/i18n.ts`

#### **0.7 ESLint & Prettier**

- [x] Install Prettier and ESLint integration packages:
- [x] Update `eslint.config.js` to integrate Prettier
- [x] Create `.prettierrc` with formatting rules (Tailwind plugin already installed)
- [x] Create `.prettierignore` file
- [x] Test with `bunx expo lint`

#### **0.8 Environment Variables**

- [ ] Create `.env.example` with all required variables:
  ```
  DATABASE_URL=
  BETTER_AUTH_SECRET=
  BETTER_AUTH_URL=
  EXPO_PUBLIC_API_URL=
  ```
- [ ] Create `.env` file (gitignored)
- [ ] Document each variable in README

#### **0.9 VSCode Configuration**

- [x] Update `.vscode/settings.json` with:
  - Format on save
  - TypeScript import organization
  - Prettier as default formatter
- [x] Create `.vscode/extensions.json` with recommended extensions:
  - Prisma
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - React Native Tools

---

### **Phase 1: Backend Foundation** 🖥️

**Goal:** Database, authentication, and API infrastructure

#### **1.1 Database Setup (Week 1)**

- [ ] Install Prisma + MySQL driver
- [ ] Create Prisma schema:
  - Better Auth tables (user, session, account, verification)
  - Todo model (id, userId, title, description, completed, createdAt, updatedAt)
  - Categories model (optional: for organizing todos)
- [ ] Set up Prisma migrations
- [ ] Create seed script with sample data
- [ ] Set up Prismock for testing

#### **1.2 Better Auth Integration (Week 1)**

- [ ] Install Better Auth
- [ ] Configure authentication providers (email/password, OAuth)
- [ ] Set up session management
- [ ] Create auth endpoints (login, register, logout, refresh)
- [ ] Add middleware for session validation

#### **1.3 tRPC Setup (Week 1-2)**

- [ ] Create tRPC router structure
- [ ] Set up tRPC context (session, user, prisma client)
- [ ] Create `publicProcedure` and `protectedProcedure` helpers
- [ ] Implement todo routers:
  ```
  - todo.getAll (protected)
  - todo.getById (protected)
  - todo.create (protected)
  - todo.update (protected)
  - todo.delete (protected)
  - todo.toggleComplete (protected)
  ```
- [ ] Add Zod input validation schemas
- [ ] Set up error handling middleware

#### **1.4 Backend Testing Setup (Week 2)**

- [ ] Configure Jest for Node.js
- [ ] Write unit tests for tRPC procedures with Prismock
- [ ] Test authorization logic (protected routes)
- [ ] Test input validation (Zod schemas)
- [ ] Set up test database (optional integration tests)

---

### **Phase 2: Frontend Foundation** 💻

**Goal:** UI framework, styling, and navigation

#### **2.1 Styling Setup (Week 2)**

- [ ] Install and configure NativeWind v4
- [ ] Set up Tailwind config with custom theme
- [ ] Create design tokens (colors, spacing, typography)
- [ ] Build base component library:
  - Button, Input, Card, Text, Container
  - Loading states, Error boundaries
  - Theme provider (light/dark mode)

#### **2.2 Navigation & Routing (Week 2-3)**

- [ ] Set up Expo Router file structure:
  ```
  /app
    /(auth)
      /login.tsx
      /register.tsx
    /(tabs)
      /index.tsx (todos list)
      /profile.tsx
    /_layout.tsx
  ```
- [ ] Create protected route wrapper
- [ ] Add navigation guards (redirect if not authenticated)
- [ ] Implement tab navigation

#### **2.3 State Management (Week 3)**

- [ ] Set up Zustand stores:
  - Auth store (user, session)
  - UI store (theme, preferences)
  - Optional: Todo store for optimistic updates
- [ ] Configure AsyncStorage persistence
- [ ] Create custom hooks for store access

#### **2.4 tRPC Client Setup (Week 3)**

- [ ] Install tRPC client + React Query
- [ ] Create tRPC provider component
- [ ] Configure React Query client (caching, refetching)
- [ ] Set up tRPC links (HTTP, auth headers)
- [ ] Create typed hooks for API calls

---

### **Phase 3: Todo App Implementation** ✅

**Goal:** Build the actual todo application

#### **3.1 Authentication UI (Week 3-4)**

- [ ] Login screen with email/password
- [ ] Registration screen
- [ ] Password reset flow
- [ ] OAuth provider buttons (optional)
- [ ] Loading & error states
- [ ] Form validation (client-side + server-side)

#### **3.2 Todo List Features (Week 4-5)**

- [ ] Todo list view with infinite scroll/pagination
- [ ] Empty state component
- [ ] Pull-to-refresh
- [ ] Todo item component (title, description, checkbox)
- [ ] Swipe actions (delete, edit)
- [ ] Filter/sort options (all, active, completed)
- [ ] Search functionality

#### **3.3 Todo CRUD Operations (Week 5)**

- [ ] Create todo modal/screen
- [ ] Edit todo modal/screen
- [ ] Delete todo with confirmation
- [ ] Toggle complete with optimistic updates
- [ ] Category assignment (optional)
- [ ] Due dates (optional)
- [ ] Loading states & error handling

#### **3.4 Profile & Settings (Week 5)**

- [ ] User profile screen
- [ ] Theme toggle (light/dark)
- [ ] Language selector
- [ ] Logout functionality
- [ ] Delete account option

---

### **Phase 4: Internationalization** 🌍

**Goal:** Multi-language support

#### **4.1 i18n Setup (Week 6)**

- [ ] Install react-i18next
- [ ] Create translation structure (`/locales/en`, `/locales/es`, etc.)
- [ ] Define translation keys for all UI text
- [ ] Set up language detection & persistence
- [ ] Create language switcher component
- [ ] Add at least 2 languages (English + 1 more)

---

### **Phase 5: Testing Infrastructure** 🧪

**Goal:** Comprehensive test coverage

#### **5.1 Storybook Setup (Week 6-7)**

- [ ] Install Storybook for React Native
- [ ] Configure Storybook with NativeWind
- [ ] Create stories for all base components
- [ ] Create stories for todo components
- [ ] Add interaction tests
- [ ] Document component props & usage

#### **5.2 Visual Regression Testing (Week 7)**

- [ ] Install Lost Pixel
- [ ] Configure Lost Pixel with Storybook
- [ ] Set up self-hosted Lost Pixel instance (Docker)
- [ ] Create baseline snapshots
- [ ] Configure CI integration

#### **5.3 Unit & Integration Tests (Week 7-8)**

- [ ] Install Jest + React Native Testing Library
- [ ] Write component unit tests
- [ ] Test custom hooks
- [ ] Test Zustand stores
- [ ] Mock tRPC calls
- [ ] Test authentication flows
- [ ] Achieve >80% code coverage

#### **5.4 E2E Testing with Maestro (Week 8)**

- [ ] Install Maestro CLI
- [ ] Create E2E test flows:
  - User registration → login
  - Create todo → mark complete → delete
  - Filter/search todos
  - Theme switching
  - Logout flow
- [ ] Set up Maestro CI integration

---

### **Phase 6: Observability & Telemetry** 📊

**Goal:** Monitoring, tracing, and debugging

#### **6.1 OpenTelemetry Setup (Week 8-9)**

- [ ] Install OTel SDKs (client + server)
- [ ] Configure exporters (Tempo, Jaeger, or similar)
- [ ] Set up sampling strategy (5% default, 100% errors)
- [ ] Create session-based tracing with `sessionId`
- [ ] Add custom spans for key operations:
  - API calls (tRPC)
  - Database queries
  - User interactions (button clicks, navigation)

#### **6.2 Error Tracking (Week 9)**

- [ ] Integrate error boundary components
- [ ] Send errors to OTel with full context
- [ ] Add breadcrumbs for user actions
- [ ] Test error scenarios

#### **6.3 Performance Monitoring (Week 9)**

- [ ] Track app startup time
- [ ] Monitor API response times
- [ ] Track render performance
- [ ] Measure cache hit rates

---

### **Phase 7: CI/CD Pipeline** 🚀

**Goal:** Automated testing and deployment

#### **7.1 GitHub Actions Setup (Week 9-10)**

- [ ] Create CI workflow:
  - Install dependencies
  - Lint (frontend + backend)
  - Type checking (TypeScript)
  - Run unit tests (Jest)
  - Build Storybook
  - Run visual regression tests (Lost Pixel)
  - Run E2E tests (Maestro)
- [ ] Set up test matrix (multiple Node versions)
- [ ] Configure caching for faster builds

#### **7.2 Deployment (Week 10)**

- [ ] Set up Expo EAS Build
- [ ] Configure staging & production environments
- [ ] Set up backend deployment (Railway, Fly.io, etc.)
- [ ] Database migrations in CI
- [ ] Environment variable management

---

### **Phase 8: Documentation & Polish** 📚

**Goal:** Make it easy for users to adopt and customize

#### **8.1 Documentation (Week 10-11)**

- [ ] Update README with:
  - Quick start guide
  - Installation instructions
  - Environment setup
  - Architecture overview
  - How to remove todo code
- [ ] Create CONTRIBUTING.md
- [ ] Document API endpoints (tRPC procedures)
- [ ] Add inline code comments
- [ ] Create architecture diagrams

#### **8.2 Developer Experience (Week 11)**

- [ ] Add VSCode settings & extensions recommendations
- [ ] Create code snippets for common patterns
- [ ] Set up hot reloading optimization
- [ ] Add debugging configurations
- [ ] Create example .env file with all variables

#### **8.3 Polish & Cleanup (Week 11)**

- [ ] Remove console.logs
- [ ] Add loading skeletons
- [ ] Improve error messages
- [ ] Add animations/transitions
- [ ] Optimize bundle size
- [ ] Test on iOS, Android, and Web
- [ ] Accessibility audit (screen readers, keyboard navigation)

---

### **Phase 9: Optional Enhancements** ✨

**Goal:** Advanced features (can be added later)

- [ ] Offline support (local-first with sync)
- [ ] Push notifications for reminders
- [ ] Collaborative todos (real-time with WebSockets)
- [ ] File attachments
- [ ] Rich text editor for descriptions
- [ ] Recurring todos
- [ ] Categories & tags
- [ ] Statistics dashboard
- [ ] Export/import functionality

---

## **📋 Suggested Sprint Breakdown**

- **Sprint 1-2 (Weeks 1-2):** Backend foundation (database, auth, tRPC)
- **Sprint 3-4 (Weeks 3-4):** Frontend foundation + Auth UI
- **Sprint 5-6 (Weeks 5-6):** Todo app features + i18n
- **Sprint 7-8 (Weeks 7-8):** Testing infrastructure (Storybook, Jest, Maestro)
- **Sprint 9-10 (Weeks 9-10):** Observability + CI/CD
- **Sprint 11 (Week 11):** Documentation + Polish

---

## **🎯 Success Criteria**

✅ Users can authenticate (login/register)  
✅ Users can create, read, update, delete todos  
✅ Full type safety from frontend to backend  
✅ 80%+ test coverage (unit + integration)  
✅ Visual regression tests passing  
✅ E2E tests covering critical flows  
✅ CI pipeline passing all checks  
✅ Multi-language support working  
✅ Observability traces visible in dashboard  
✅ Documentation complete for easy adoption
