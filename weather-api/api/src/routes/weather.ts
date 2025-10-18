import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { baseUrl } from "..";
import redis from "../db/redis";

const requestSchema = z.object({
  city: z.string().min(1, "City name is required"),
  country: z
    .string()
    .regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters"),
});

const responseSchema = z.object({
  message: z.string(),
  location: z.string(),
  days: z.array(
    z.object({
      date: z.string(),
      tempmax: z.number(),
      tempmin: z.number(),
      precipprob: z.number().nullable(),
      condition: z.string(),
      description: z.string(),
      humidity: z.number().nullable(),
      windspeed: z.number().nullable(),
      percipType: z.array(z.string()).nullable(),
      uvIndex: z.number().nullable(),
      icon: z.string().nullable(),
    }),
  ),
});

type WeatherResponse = z.infer<typeof responseSchema>;

export const weatherRoute = new Hono().get(
  "/",
  zValidator("query", requestSchema),
  async (c) => {
    const { city, country } = c.req.valid("query");

    try {
      const cachedResponse = await redis.hGetAll(`weather:${city},${country}`);

      if (Object.keys(cachedResponse).length) {
        return c.json({
          message: "Weather data fetched successfully (from cache)",
          location: cachedResponse.location,
          days: JSON.parse(cachedResponse.days),
        });
      }

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

      await redis.hSet(`weather:${city},${country}`, {
        location: data.resolvedAddress,
        days: JSON.stringify(days),
      });

      await redis.expire(`weather:${city},${country}`, 3600); // Cache for 1 hour

      return c.json<WeatherResponse>({
        message: "Weather data fetched successfully",
        location: data.resolvedAddress,
        days,
      });
    } catch (error) {
      return c.json(
        { error: "An error occurred while fetching weather data" },
        500,
      );
    } finally {
      baseUrl.pathname = "/VisualCrossingWebServices/rest/services/timeline";
    }
  },
);
