import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "dotenv";
import { weatherRoute } from "./routes/weather";

const app = new Hono();

app.use("*", cors());

config({ path: "../.env" });

export const baseUrl = new URL(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
);
const API_KEY = process.env.WEATHER_API_KEY || "";

baseUrl.search = new URLSearchParams({ key: API_KEY }).toString();

const AppRoute = app.route("/weather", weatherRoute);

export default app;
export type AppType = typeof AppRoute;
