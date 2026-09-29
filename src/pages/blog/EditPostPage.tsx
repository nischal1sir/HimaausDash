import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PostForm from './PostForm'
import { getPost, updatePost, type PostInput } from '../../lib/blogStore'
import type { BlogPost } from '../../types'

export default function EditPostPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      getPost(id).then((data) => {
        setPost(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [id])

  async function handleSubmit(input: PostInput) {
    if (!id) return
    setSubmitting(true)
    setError('')
    try {
      await updatePost(id, input)
      navigate('/blog-posts/all-posts')
    } catch (err: any) {
      setError(err?.message || 'Failed to update post')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
        <p className="text-[13.5px] font-medium text-surface-heading">Post not found</p>
        <p className="mt-1 text-[12.5px] text-surface-muted">
          It may have been deleted. Go back to the list to see current posts.
        </p>
      </div>
    )
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
          <h2 className="text-[16px] font-bold text-brand-600 sm:text-lg">Edit Blog Post</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">Update this blog post</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <PostForm
        initial={post}
        submitLabel={submitting ? 'Saving...' : 'Save Changes'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/blog-posts/all-posts')}
      />
    </div>
  )
}
