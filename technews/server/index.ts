import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { auth } from "./utils/auth";
import type { ErrorResponse } from "@/shared/types";
import type { Context } from "@/context";
import { postRoutes } from "@/routes/posts";
import { logger } from "hono/logger";

// save cookie in memory for development purposes
export let sessionCookie: string | null = null;

const app = new Hono<Context>();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  const response = await auth.handler(c.req.raw);
  const setCookie = response.headers.get("Set-Cookie");
  if (setCookie) {
    sessionCookie = setCookie.split(";")[0]!; // Store cookie in memory
  }
  return response;
});

const apiRoutes = app
  .basePath("/api")
  .get("/", (c) => {
    return c.json({ message: "Hello", date: new Date().toISOString() });
  })
  .route("/posts", postRoutes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          error: err.message,
          isFormError:
            err.cause && typeof err.cause === "object" && "form" in err.cause
              ? err.cause.form === true
              : false,
        },
        err.status,
      );

    return errResponse;
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

export default app;
export type ApiRoutes = typeof apiRoutes;
