import { Loader, AlertCircle, Heart, Trash2 } from 'lucide-react'
import { useFavouritesList } from '@/hooks/useFavourite'
import { useFavoriteBlog } from '@/hooks/useBlog'

export default function FavouritesList() {
  const { data, isLoading, error, isError } = useFavouritesList()
  const unfavoriteMutation = useFavoriteBlog()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin" size={32} />
      </div>
    )
  }

  if (isError && error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Favourite Blogs</h2>
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg flex gap-4">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">Error loading favourites</h3>
            <p className="text-red-700 text-sm">
              {error instanceof Error ? error.message : 'Failed to load your favourites'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  const blogs = data?.data || []

  if (!blogs || blogs.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Favourite Blogs</h2>
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Heart className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Favourite Blogs Yet</h3>
          <p className="text-gray-500 mb-6">You haven't added any blogs to your favourites</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Blogs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Favourite Blogs ({blogs.length})</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
              
              <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                <span className="text-red-600 font-medium">Favourited</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mb-4 inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                <Heart size={12} className="inline mr-1" fill="currentColor" />
                In Favourites
              </div>

              <button
                onClick={() => unfavoriteMutation.mutate(blog.id)}
                disabled={unfavoriteMutation.isPending}
                className="w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <Trash2 size={16} />
                {unfavoriteMutation.isPending ? 'Removing...' : 'Remove from Favourites'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
