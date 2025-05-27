import { Context, Hono } from "hono";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.json("Hello Hono!");
});

export default app;
