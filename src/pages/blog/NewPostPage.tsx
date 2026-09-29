import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PostForm from './PostForm'
import { addPost, type PostInput } from '../../lib/blogStore'

export default function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(input: PostInput) {
    setSubmitting(true)
    setError('')
    try {
      await addPost(input)
      navigate('/blog-posts/all-posts')
    } catch (err: any) {
      setError(err?.message || 'Failed to create post')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/blog-posts/all-posts')}
          className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-brand-600"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-[16px] font-bold text-brand-600 sm:text-lg">New Blog Post</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">Create a new blog post</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <PostForm
        submitLabel={submitting ? 'Creating...' : 'Create Post'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/blog-posts/all-posts')}
      />
    </div>
  )
}
