# Weather API

A simple full-stack weather application for learning purposes featuring a Hono-based API backend with Redis caching and a React frontend.

**Project Link**: [Link](https://roadmap.sh/projects/weather-api-wrapper-service)

## Features

- **Weather Data**: Get 7-day weather forecasts for any city/country
- **Caching**: Redis-based caching for improved performance (1-hour TTL)
- **Validation**: Input validation using Zod
- **CORS Support**: Cross-origin resource sharing enabled
- **Type Safety**: Full TypeScript support across the stack
- **Modern UI**: Responsive React frontend with Tailwind CSS

## Tech Stack

### Backend (API)

- **Framework**: Hono
- **Runtime**: Bun
- **Database**: Redis (caching)
- **Validation**: Zod
- **External API**: Visual Crossing Weather API
- **TypeScript**: Full type safety

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Linting**: ESLint

## Prerequisites

- Node.js (for frontend package management)
- Bun (for API runtime)
- Redis server running locally

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd weather-api
   ```

2. Install dependencies for both API and frontend:

   ```bash
   npm run install:all
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env and add your Visual Crossing Weather API key
   ```

4. Start Redis server (if not already running):
   ```bash
   redis-server
   ```

## Usage

### Development

Start both API and frontend in development mode:

```bash
npm run dev
```

This will:

- Start the API server on port 3000 (with hot reload)
- Start the frontend dev server on port 5173

### Production

Build and start for production:

```bash
npm run build:frontend
npm start
```

## API Endpoints

### GET /weather

Fetch weather data for a specific location.

**Query Parameters:**

- `city` (string): City name (required)
- `country` (string): 2-letter country code in uppercase (required, e.g., "US", "GB")

**Example Request:**

```
GET /weather?city=London&country=GB
```

**Response:**

```json
{
  "message": "Weather data fetched successfully",
  "location": "London, England, United Kingdom",
  "days": [
    {
      "date": "2024-01-15",
      "tempmax": 15.2,
      "tempmin": 8.5,
      "precipprob": 20,
      "condition": "Partly cloudy",
      "description": "Partly cloudy throughout the day.",
      "humidity": 65,
      "windspeed": 12.5,
      "percipType": ["rain"],
      "uvIndex": 3,
      "icon": "partly-cloudy-day"
    }
    // ... up to 7 days
  ]
}
```

## Environment Variables

- `WEATHER_API_KEY`: Your Visual Crossing Weather API key (required)

Get your API key from: https://www.visualcrossing.com/weather-api

## Project Structure

```
weather-api/
├── api/                    # Backend API
│   ├── src/
│   │   ├── routes/
│   │   │   └── weather.ts  # Weather endpoint
│   │   ├── db/
│   │   │   └── redis.ts    # Redis connection
│   │   └── index.ts        # Main API server
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── .env.example            # Environment variables template
├── package.json            # Root scripts
└── README.md
```

## License

MIT License - see LICENSE file for details
