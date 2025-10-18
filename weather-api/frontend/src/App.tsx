import { useState } from "react";
import { WeatherForm } from "./components/WeatherForm";
import { WeatherCard } from "./components/WeatherCard";
import { hc } from "hono/client";
import type { AppType } from "../../api/src/index";

// Define the API types
export interface WeatherDay {
  date: string;
  tempmax: number;
  tempmin: number;
  precipprob: number;
  condition: string;
  description: string;
  humidity: number;
  windspeed: number;
  percipType: string[] | null;
  uvIndex: number;
  icon: string;
}

export interface WeatherResponse {
  message: string;
  location: string;
  days: WeatherDay[];
}

// Create the client
// @ts-expect-error // Ignore type error for demonstration purposes
const client = hc<AppType>("http://localhost:3000");

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string, country: string) => {
    setLoading(true);
    setWeather(null); // Clear previous weather data
    try {
      const response = await client.weather.$get({
        query: {
          city,
          country,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        throw new Error("Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather({
        message: "Error fetching from server, please try again",
        location: "",
        days: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🌤️ Weather Forecast
          </h1>
          <p className="text-blue-100 text-lg">
            Get the latest weather information for any city
            <br /> Frontend is my passion! :)
          </p>
        </div>

        <WeatherForm onSubmit={fetchWeather} loading={loading} />

        {weather && (
          <div className="max-w-7xl mx-auto">
            {weather.location && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  📍 {weather.location}
                </h2>
              </div>
            )}
            <div className="text-center mb-6">
              <p
                className={`text-lg font-semibold ${
                  weather.days.length === 0 ? "text-red-300" : "text-blue-100"
                }`}
              >
                {weather.message}
              </p>
            </div>

            {weather.days.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {weather.days.map((day) => (
                  <WeatherCard key={day.date} day={day} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
