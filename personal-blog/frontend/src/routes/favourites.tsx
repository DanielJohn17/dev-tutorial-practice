import { createFileRoute } from '@tanstack/react-router'
import FavouritesList from '../components/FavouritesList'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/favourites')({
  component: Favourites,
})

function Favourites() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Sign in Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your favourites</p>
          <div className="space-y-3">
            <Link
              to="/signin"
              className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block w-full py-2 px-4 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <FavouritesList />
      </div>
    </div>
  )
}
