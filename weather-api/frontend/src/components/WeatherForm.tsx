import { useState } from 'react'

interface WeatherFormProps {
  onSubmit: (city: string, country: string) => void
  loading: boolean
}

export function WeatherForm({ onSubmit, loading }: WeatherFormProps) {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim() || !country.trim()) {
      setError('Please enter both city and country code')
      return
    }
    setError('')
    onSubmit(city.trim(), country.trim())
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Get Weather Forecast</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City (e.g., Addis Ababa)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Country Code (e.g., ET)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500 uppercase"
            disabled={loading}
            maxLength={2}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              'Get Forecast'
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
