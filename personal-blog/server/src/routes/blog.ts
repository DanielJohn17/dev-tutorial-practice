import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createBlogSchema } from "@/shared/types";
import { Context } from "@/context";

export const blogRoute = new Hono<Context>().post(
  "/",
  zValidator("json", createBlogSchema),
  (c) => {
    const user = c.get("user");
    const session = c.get("session");

    if (!user) return c.body(null, 401);

    return c.json({ user: user, session: session });
  },
);
