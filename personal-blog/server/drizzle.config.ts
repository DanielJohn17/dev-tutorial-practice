import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";
import * as path from "path";

config({
  path: path.resolve(__dirname, "../.env"),
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
