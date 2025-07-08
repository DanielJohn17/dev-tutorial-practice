import { type Context, Hono } from "hono";
import { auth } from "./utils/auth";
import { HTTPException } from "hono/http-exception";
import type { ErrorResponse } from "@/shared/types";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

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
    500,
  );
});

export default app;
