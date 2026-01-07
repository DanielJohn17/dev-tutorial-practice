import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateBlog } from '@/hooks/useBlog'
import { createBlogSchema } from '@repo/shared'
import { Loader, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

type CreateBlogInput = z.infer<typeof createBlogSchema>

export default function CreateBlogForm() {
  const [successMessage, setSuccessMessage] = useState('')
  const createMutation = useCreateBlog()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBlogInput>({
    resolver: zodResolver(createBlogSchema),
  })

  const onSubmit = async (data: CreateBlogInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Blog created successfully!')
        reset()
        setTimeout(() => setSuccessMessage(''), 3000)
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle className="text-green-600" size={20} />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {createMutation.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-800">
            {createMutation.error.message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            {...register('content')}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Enter blog content"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {createMutation.isPending && <Loader size={20} className="animate-spin" />}
          {createMutation.isPending ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  )
}
