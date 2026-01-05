import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { ErrorResponse } from "@repo/shared";

import "@/utils/dotenv_config";
import { auth } from "@/utils/auth";
import { Context } from "@/context";
import { blogRoute } from "./routes/blog";

const app = new Hono<Context>();

app.use("*", logger());
app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:5000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
// better auth
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);

    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

const apiRoute = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/blog", blogRoute)
  .onError((err, c) => {
    if (err instanceof HTTPException) {
      const errorResponse =
        err.res ??
        c.json<ErrorResponse>(
          {
            success: false,
            error: err.message,
          },
          err.status,
        );

      return errorResponse;
    }

    return c.json<ErrorResponse>(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : (err.stack ?? err.message),
      },
      501,
    );
  });

export type AppType = typeof apiRoute;
export default app;
