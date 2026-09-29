import type { NoticeItem } from '../types'
import apiClient from '../services/apiClient'

const STORAGE_KEY = 'himaaus-dash-notice-items'

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'Holiday Closure',
    description: 'Our office will be closed on 15 August for Independence Day.',
    createdAt: '2026-08-01',
  },
  {
    id: 'notice-2',
    title: 'New Student Session',
    description: 'A webinar on study abroad opportunities is scheduled for next Monday.',
    createdAt: '2026-08-05',
  },
]

function normalizeNotice(item: any): NoticeItem {
  return {
    id: item._id || item.id || `notice-${Date.now()}`,
    title: item.title || '',
    description: item.description || '',
    createdAt: item.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  }
}

export function getNotices(): NoticeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_NOTICES
    return JSON.parse(raw) as NoticeItem[]
  } catch {
    return DEFAULT_NOTICES
  }
}

export async function fetchNotices(): Promise<NoticeItem[]> {
  try {
    const data = await apiClient.get<any[]>('/notices')
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeNotice)
      saveNotices(normalized)
      return normalized
    }
  } catch (err) {
    console.error('Failed to fetch notices from API:', err)
  }
  return getNotices()
}

function saveNotices(items: NoticeItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function addNotice(title: string, description: string): Promise<NoticeItem[]> {
  try {
    const created = await apiClient.post<any>('/notices', { title, description })
    const newNotice = normalizeNotice(created)
    const updated = [newNotice, ...getNotices()]
    saveNotices(updated)
    return updated
  } catch (err) {
    console.error('Failed to add notice via API:', err)
    const newNotice: NoticeItem = {
      id: `notice-${Date.now()}`,
      title,
      description,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    const updated = [newNotice, ...getNotices()]
    saveNotices(updated)
    return updated
  }
}

export async function deleteNotice(id: string): Promise<NoticeItem[]> {
  try {
    await apiClient.delete(`/notices/${id}`)
  } catch (err) {
    console.error(`Failed to delete notice ${id} via API:`, err)
  }
  const updated = getNotices().filter((item) => item.id !== id)
  saveNotices(updated)
  return updated
}

