import type { BlogPost } from '../types'
import apiClient from '../services/apiClient'

function normalizeBlog(data: any): BlogPost {
  return {
    id: data._id || data.id,
    title: data.title || '',
    link: data.link || '',
    author: data.author || 'Admin',
    excerpt: data.excerpt || '',
    longDescription: data.longDescription || '',
    category: data.category || 'general',
    image: data.image || '',
    status: data.status || 'published',
    date: data.date || (data.createdAt ? data.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]),
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await apiClient.get<any[]>('/blogs')
    return Array.isArray(data) ? data.map(normalizeBlog) : []
  } catch (err) {
    console.error('Failed to fetch blogs from API:', err)
    return []
  }
}

export async function getPost(id: string): Promise<BlogPost | undefined> {
  try {
    const data = await apiClient.get<any>(`/blogs/${id}`)
    return data ? normalizeBlog(data) : undefined
  } catch (err) {
    console.error(`Failed to fetch blog ${id}:`, err)
    return undefined
  }
}

export interface PostInput {
  title: string
  link: string
  author: string
  excerpt: string
  longDescription: string
  category: string
  image: string
  status: 'draft' | 'published'
}

export async function addPost(input: PostInput): Promise<BlogPost> {
  const data = await apiClient.post<any>('/blogs', input)
  return normalizeBlog(data)
}

export async function updatePost(id: string, input: PostInput): Promise<BlogPost> {
  const data = await apiClient.put<any>(`/blogs/${id}`, input)
  return normalizeBlog(data)
}

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/blogs/${id}`)
}
