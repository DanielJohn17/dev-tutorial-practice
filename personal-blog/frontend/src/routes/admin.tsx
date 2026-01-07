import { createFileRoute } from '@tanstack/react-router'
import CreateBlogForm from '../components/CreateBlogForm'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/admin')({
  component: Admin,
})

function Admin() {
  const { isAuthenticated, user } = useAuth()
  const isAdmin = user?.role === 'admin'

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in Required</h1>
          <p className="text-gray-600">Please sign in to access admin panel</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin panel</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <CreateBlogForm />
      </div>
    </div>
  )
}
