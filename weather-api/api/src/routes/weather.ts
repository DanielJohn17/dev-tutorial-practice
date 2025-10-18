import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { baseUrl } from "..";

const requestSchema = z.object({
  city: z.string().min(1, "City name is required"),
  country: z
    .string()
    .regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters"),
});

export const weatherRoute = new Hono().get(
  "/",
  zValidator("query", requestSchema),
  async (c) => {
    const { city, country } = c.req.valid("query");

    try {
      baseUrl.pathname += `/${city},${country}`;
      const response = await fetch(baseUrl.toString());

      if (!response.ok) {
        return c.json({ error: "Failed to fetch weather data" }, 500);
      }

      const data = await response.json();
      const days = data.days.slice(0, 7).map((day: any) => ({
        date: day.datetime,
        tempmax: day.tempmax,
        tempmin: day.tempmin,
        precipprob: day.precipprob,
        condition: day.conditions,
        description: day.description,
        humidity: day.humidity,
        windspeed: day.windspeed,
        percipType: day.preciptype,
        uvIndex: day.uvindex,
        icon: day.icon,
      }));

      return c.json({
        message: "Weather data fetched successfully",
        location: data.resolvedAddress,
        days,
      });
    } catch (error) {
      return c.json(
        { error: "An error occurred while fetching weather data" },
        500,
      );
    }
  },
);
