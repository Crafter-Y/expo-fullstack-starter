import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // this is a hack. When the schema gets generated, the DATABASE_URL env var is not always available.
    url: process.env.DATABASE_URL ? env("DATABASE_URL") : "",
  },
});
