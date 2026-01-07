import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/schema/auth";

const schema = { user, session, account, verification };

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5000"],
  plugins: [admin()],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return { data: { ...user, role: "user" } };
        },
      },
    },
  },
});
