import { useState } from 'react'
import { Heart, Loader, AlertCircle } from 'lucide-react'
import { useBlogList, useFavoriteBlog } from '@/hooks/useBlog'
import { useAuth } from '@/hooks/useAuth'

export default function BlogList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useBlogList(page, 10)
  const { isAuthenticated } = useAuth()
  const favoriteMutation = useFavoriteBlog()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin" size={32} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg flex gap-3">
        <AlertCircle className="text-red-600" />
        <div>
          <h3 className="font-semibold text-red-800">Error loading blogs</h3>
          <p className="text-red-700">{error.message}</p>
        </div>
      </div>
    )
  }

  const { data: blogs, pagination } = data || {}

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
              
              <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                <span>{blog.user?.username || 'Unknown'}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                {isAuthenticated && (
                  <button
                    onClick={() => favoriteMutation.mutate(blog.id)}
                    disabled={favoriteMutation.isPending}
                    className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      blog.isFavourite
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } disabled:opacity-50`}
                  >
                    <Heart size={16} fill={blog.isFavourite ? 'currentColor' : 'none'} />
                    {blog.isFavourite ? 'Favorited' : 'Favorite'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
