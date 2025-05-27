import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "server/db/shemas/*",
  out: "drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
