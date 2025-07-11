import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schemas from "@/db/schemas/auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schemas,
      user: schemas.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    /* github: { */
    /*   clientId: process.env.GITHUB_CLIENT_ID!, */
    /*   clientSecret: process.env.GITHUB_CLIENT_SECRET!, */
    /* }, */
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
});
