## **🗺️ Implementation Roadmap: Full-Stack Expo Todo App Starter**

### **Phase 0: Project Foundation & Setup** ⚙️

**Goal:** Set up core infrastructure and tooling incrementally

#### **0.1 NativeWind Setup**

- [x] Install NativeWind v4 and dependencies (`nativewind`, `tailwindcss`)
- [x] Create `tailwind.config.js` with content paths
- [x] Update `babel.config.js` to include NativeWind preset
- [x] Test basic styling on a component

#### **0.2 Docker Development Environment**

- [x] Create `docker-compose.yml` with services:
  - MySQL database
  - OpenTelemetry Collector
  - Tempo (tracing backend)
  - Grafana (observability dashboard)
- [x] Update `.env.example` with Docker database URL
- [x] Add Docker setup instructions to README
- [x] Test Docker services with `docker compose up -d`

#### **0.3 tRPC Dependencies**

- [x] Install tRPC server packages (`@trpc/server`)
- [x] Install tRPC client packages (`@trpc/client`, `@trpc/react-query`)
- [x] Install React Query (`@tanstack/react-query`)
- [x] Install Zod for input validation (`zod`)

#### **0.4 Zustand Setup**

- [x] Install Zustand (`zustand`)
- [x] Install AsyncStorage for persistence (`@react-native-async-storage/async-storage`)
- [x] Create preferences store for language and theme
- [x] Integrate with i18n for language persistence
- [x] Create custom hooks for easy usage

#### **0.5 i18next Setup**

- [x] Install i18next packages (`react-i18next`, `i18next`)
- [x] Install Expo localization (`expo-localization`)

#### **0.6 ESLint & Prettier**

- [x] Install Prettier and ESLint integration packages:
- [x] Update `eslint.config.js` to integrate Prettier
- [x] Create `.prettierrc` with formatting rules (Tailwind plugin already installed)
- [x] Create `.prettierignore` file
- [x] Test with `bunx expo lint`

#### **0.7 Environment Variables**

- [x] Create `.env.example` with all required variables
- [x] Create `.env` file (gitignored)
- [x] Document each variable in README

#### **0.8 VSCode Configuration**

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

#### **1.1 Better Auth Integration (Week 1)**

**Server Setup:**

- [x] Install Better Auth server packages: `better-auth @better-auth/expo`
- [x] Install Prisma adapter: `@prisma/client mysql2`
- [x] Initialize Prisma with `bunx prisma init`
- [x] Create Better Auth config at `/lib/auth.ts`:
  - Add Expo plugin
  - Configure Prisma adapter (refer to https://www.better-auth.com/docs/adapters/prisma)
  - Enable email/password authentication
  - Add `trustedOrigins` with scheme `expofullstackstarter://`
- [x] Create Expo API route at `/app/api/auth/[...auth]+api.ts`
- [x] Mount Better Auth handler for GET and POST requests
- [x] Generate Better Auth database schema with Prisma
- [x] Run Prisma migrations

**Client Setup:**

- [x] Install client packages: `better-auth @better-auth/expo expo-secure-store`
- [x] Create auth client at `/lib/auth-client.ts`:
  - Import `expoClient` plugin from `@better-auth/expo/client`
  - Configure with scheme `expofullstackstarter` (from app.json)
  - Use `process.env.EXPO_PUBLIC_API_URL` for baseURL
  - Configure SecureStore for session caching
- [x] Update `metro.config.js` to enable `unstable_enablePackageExports`
- [x] Test basic authentication flow (sign up, sign in, session)

#### **1.2 Prisma Schema & Database Setup (Week 1)**

- [x] Extend Prisma schema with app models:
  - Todo model (id, userId, title, description, completed, createdAt, updatedAt)
  - Categories model (optional: for organizing todos)
- [x] Run Prisma migrations for app tables
- [ ] Create seed script with sample data
- [ ] Set up Prismock for testing
- [x] Test database connection

#### **1.3 tRPC Setup (Week 1-2)**

- [x] Create tRPC router structure
- [x] Set up tRPC context (session, user, prisma client)
- [x] Create `publicProcedure` and `protectedProcedure` helpers
- [x] Implement todo routers:
  ```
  - todo.getAll (protected)
  - todo.getById (protected)
  - todo.create (protected)
  - todo.update (protected)
  - todo.delete (protected)
  - todo.toggleComplete (protected)
  ```
- [x] Add Zod input validation schemas
- [x] Set up error handling middleware

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

- [x] Install and configure NativeWind v4
- [x] Set up Tailwind config with custom theme
- [ ] Create design tokens (colors, spacing, typography)
- [ ] Build base component library:
  - Button, Input, Card, Text, Container
  - Loading states, Error boundaries
  - Theme provider (light/dark mode)

#### **2.2 Navigation & Routing (Week 2-3)**

- [x] Set up Expo Router file structure:
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
- [x] Create protected route wrapper
- [x] Add navigation guards (redirect if not authenticated)
- [x] Implement tab navigation

#### **2.3 State Management (Week 3)**

- [x] Set up Zustand stores:
  - ~~Auth store (user, session)~~ (handled by Better Auth)
  - Preferences store (language, theme)
  - ~~Todo store for optimistic updates~~ (handled by tRPC React Query)
- [x] Configure AsyncStorage persistence
- [x] Create custom hooks for store access (`useLanguage`)

#### **2.4 tRPC Client Setup (Week 3)**

- [x] Install tRPC client + React Query
- [x] Create tRPC provider component
- [x] Configure React Query client (caching, refetching)
- [x] Set up tRPC links (HTTP, auth headers)
- [x] Create typed hooks for API calls

---

### **Phase 3: Todo App Implementation** ✅

**Goal:** Build the actual todo application

#### **3.1 Authentication UI (Week 3-4)**

- [x] Login screen with email/password
- [x] Registration screen
- [ ] Password reset flow
- [ ] OAuth provider buttons (optional)
- [x] Loading & error states
- [x] Form validation (client-side + server-side)

#### **3.2 Todo List Features (Week 4-5)**

- [x] Todo list view with infinite scroll/pagination
- [x] Empty state component
- [x] Pull-to-refresh
- [x] Todo item component (title, description, checkbox)
- [ ] Swipe actions (delete, edit)
- [ ] Filter/sort options (all, active, completed)
- [ ] Search functionality

#### **3.3 Todo CRUD Operations (Week 5)**

- [ ] Create todo modal/screen
- [ ] Edit todo modal/screen
- [ ] Delete todo with confirmation
- [x] Toggle complete with optimistic updates
- [ ] Category assignment (optional)
- [ ] Due dates (optional)
- [x] Loading states & error handling

#### **3.4 Profile & Settings (Week 5)**

- [x] User profile screen
- [ ] Theme toggle (light/dark)
- [x] Language selector
- [x] Logout functionality
- [ ] Delete account option

---

### **Phase 4: Internationalization** 🌍

**Goal:** Multi-language support

#### **4.1 i18n Setup (Week 6)**

- [x] Install react-i18next
- [x] Create translation structure (`/locales/en`, `/locales/de`)
- [x] Define translation keys for all UI text
- [x] Set up language detection (device language detection)
- [x] Create language switcher component (in profile settings)
- [x] Add at least 2 languages (English + German)

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
- [ ] Add Lost Pixel service to `docker-compose.yml`
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
- [ ] Configure exporters to send data to Docker Tempo instance
- [ ] Set up sampling strategy (5% default, 100% errors)
- [ ] Create session-based tracing with `sessionId`
- [ ] Configure Grafana dashboards for trace visualization
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
- [ ] Deploy production database (managed MySQL service)
- [ ] Deploy observability stack (Grafana Cloud or self-hosted)
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
