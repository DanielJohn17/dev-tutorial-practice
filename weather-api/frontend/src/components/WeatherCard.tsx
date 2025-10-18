import type { WeatherDay } from '../App'

interface WeatherCardProps {
  day: WeatherDay
}

export function WeatherCard({ day }: WeatherCardProps) {
  const getWeatherIcon = (icon: string) => {
    // Simple icon mapping - in a real app, you'd use a weather icon library
    const iconMap: Record<string, string> = {
      'partly-cloudy-day': '⛅',
      'rain': '🌧️',
      'clear-day': '☀️',
      'cloudy': '☁️',
      'snow': '❄️',
      'wind': '💨',
    }
    return iconMap[icon] || '🌤️'
  }

  const getUvColor = (uv: number) => {
    if (uv <= 2) return 'text-green-600 bg-green-50'
    if (uv <= 5) return 'text-yellow-600 bg-yellow-50'
    if (uv <= 7) return 'text-orange-600 bg-orange-50'
    if (uv <= 10) return 'text-red-600 bg-red-50'
    return 'text-purple-600 bg-purple-50'
  }

  const getPrecipColor = (prob: number) => {
    if (prob === 0) return 'text-gray-600 bg-gray-50'
    if (prob <= 30) return 'text-blue-600 bg-blue-50'
    if (prob <= 60) return 'text-blue-700 bg-blue-100'
    return 'text-blue-800 bg-blue-200'
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out overflow-hidden border-2 border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center">
          <div className="text-6xl mb-4 drop-shadow-xl animate-pulse">{getWeatherIcon(day.icon)}</div>
          <h3 className="text-white font-bold text-xl mb-2 tracking-wide">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
          </h3>
          <p className="text-blue-100 text-sm font-medium bg-white/20 rounded-full px-3 py-1 inline-block">
            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Temperature Display */}
        <div className="text-center bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">High</p>
              <div className="flex items-center space-x-1">
                <span className="text-4xl font-black text-red-500 drop-shadow-lg">{Math.round(day.tempmax)}</span>
                <span className="text-xl text-red-400 font-semibold">°C</span>
              </div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-red-300 via-gray-300 to-blue-300 rounded-full"></div>
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Low</p>
              <div className="flex items-center space-x-1">
                <span className="text-4xl font-black text-blue-500 drop-shadow-lg">{Math.round(day.tempmin)}</span>
                <span className="text-xl text-blue-400 font-semibold">°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Condition */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
          <p className="text-gray-800 font-bold text-center text-lg mb-2">{day.condition}</p>
          <p className="text-gray-600 text-sm text-center leading-relaxed italic">{day.description}</p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200 flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">💧</span>
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Humidity</span>
            </div>
            <p className="text-blue-800 font-black text-2xl">{day.humidity}<span className="text-lg font-semibold">%</span></p>
          </div>

          {/* Wind Speed */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-200 flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">💨</span>
              <span className="text-gray-700 font-semibold text-sm uppercase tracking-wide">Wind</span>
            </div>
            <p className="text-gray-800 font-black text-2xl">{day.windspeed}<span className="text-lg font-semibold ml-1">km/h</span></p>
          </div>

          {/* Precipitation */}
          <div className={`rounded-2xl p-4 border-2 flex flex-col items-center justify-center ${getPrecipColor(day.precipprob)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🌧️</span>
              <span className="font-semibold text-sm uppercase tracking-wide">Rain</span>
            </div>
            <p className="font-black text-2xl">{day.precipprob}<span className="text-lg font-semibold">%</span></p>
          </div>

          {/* UV Index */}
          <div className={`rounded-2xl p-4 border-2 flex flex-col items-center justify-center ${getUvColor(day.uvIndex)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">☀️</span>
              <span className="font-semibold text-sm uppercase tracking-wide">UV Index</span>
            </div>
            <p className="font-black text-2xl">{day.uvIndex}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
