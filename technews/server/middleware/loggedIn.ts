import { sessionCookie } from "@/index";
import { auth } from "@/utils/auth";
import type { MiddlewareHandler, Next, Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const loggedIn: MiddlewareHandler = async (c: Context, next: Next) => {
  if (!sessionCookie) {
    throw new HTTPException(401, { message: "No session Cookie found!" });
  }
  const headers = new Headers(c.req.raw.headers);
  headers.set("Cookie", sessionCookie);

  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
};
