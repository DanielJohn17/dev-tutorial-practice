import { type Context, Hono } from "hono";
import { auth } from "./utils/auth";
import { HTTPException } from "hono/http-exception";
import type { ErrorResponse } from "@/shared/types";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.get("/", (c: Context) => {
  return c.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

const apiRoutes = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .onError((err, c) => {
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
      500,
    );
  });

export default app;
export type ApiRoutes = typeof apiRoutes;
