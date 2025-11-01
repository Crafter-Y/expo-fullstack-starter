# expo-fullstack-starter

A full-stack Expo starter template featuring a todo app with complete authentication, database integration, and testing infrastructure.

## Tech Stack

**Frontend:**

- React Native + Expo (with Expo Router)
- NativeWind (Tailwind CSS)
- tRPC + React Query
- Zustand (state management)
- i18next (internationalization)

**Backend:**

- tRPC (API layer)
- Better Auth (authentication)
- Prisma ORM
- MySQL

**Testing:**

- Storybook (component development)
- Lost Pixel (visual regression)
- Jest + React Native Testing Library
- Maestro (E2E testing)

**DevOps:**

- OpenTelemetry (observability)
- GitHub Actions (CI/CD)

See [TECHSTACK.md](./TECHSTACK.md) for detailed architecture.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) and Docker Compose installed

### Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Start Docker services:**

   ```bash
   docker compose up -d
   ```

   This starts:
   - MariaDB database (port 3306)
   - OpenTelemetry Collector
   - Tempo (tracing backend)
   - Grafana (observability dashboard)

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Fill in the required values:
   - `DATABASE_URL`: `mysql://root:password@localhost:3306/todoapp` (default Docker MariaDB setup)
   - `BETTER_AUTH_SECRET`: Random secret for auth (generate with `openssl rand -base64 32`)
   - `EXPO_PUBLIC_API_URL`: API URL for client (default: `http://localhost:8081`)

4. **Start the development server:**
   ```bash
   bun start
   ```

## Docker Services

The `docker-compose.yml` provides the following services for development:

- **MariaDB**: Database server (port 3306)
- **OpenTelemetry Collector**: Telemetry data aggregation
- **Tempo**: Distributed tracing backend
- **Grafana**: Observability dashboard (port 3000)

### Managing Docker Services

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Reset database (removes all data)
docker compose down -v
```

## Environment Variables

| Variable              | Description                   | Example                                        |
| --------------------- | ----------------------------- | ---------------------------------------------- |
| `DATABASE_URL`        | Database connection string    | `mysql://root:password@localhost:3306/todoapp` |
| `BETTER_AUTH_SECRET`  | Secret key for authentication | `your-secret-key`                              |
| `EXPO_PUBLIC_API_URL` | Public API endpoint           | `http://localhost:8081`                        |
