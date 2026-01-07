import { createFileRoute } from '@tanstack/react-router'
import BlogList from '../components/BlogList'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>
        <BlogList />
      </div>
    </div>
  )
}
