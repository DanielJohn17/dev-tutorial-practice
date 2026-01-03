import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ErrorResponse } from "@/shared/types";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError((err, c) => {
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

export default app;
