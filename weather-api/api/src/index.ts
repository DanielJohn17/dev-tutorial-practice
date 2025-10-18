import { Hono } from "hono";
import { config } from "dotenv";
import { weatherRoute } from "./routes/weather";

const app = new Hono();
config({ path: "../.env" });

export const baseUrl = new URL(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
);
const API_KEY = process.env.WEATHER_API_KEY || "";

baseUrl.search = new URLSearchParams({ key: API_KEY }).toString();

app.route("/weather", weatherRoute);

export default app;
