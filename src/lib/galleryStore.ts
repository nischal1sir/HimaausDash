import type { GalleryItem } from '../types'
import apiClient from '../services/apiClient'

const STORAGE_KEY = 'himaaus-dash-gallery-items'
const DEFAULT_ITEMS: GalleryItem[] = []

function normalizeGalleryItem(item: any): GalleryItem {
  return {
    id: item._id || item.id || `gal-${Date.now()}`,
    title: item.title || '',
    category: item.category || 'General',
    imageUrl: item.imageUrl || item.url || item.image || '',
    uploadedAt: item.uploadedAt || item.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  }
}

export function getGalleryItems(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_ITEMS
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    return DEFAULT_ITEMS
  }
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const data = await apiClient.get<any[]>('/gallery')
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeGalleryItem)
      saveGalleryItems(normalized)
      return normalized
    }
  } catch (err) {
    console.error('Failed to fetch gallery items from API:', err)
  }
  return getGalleryItems()
}

function saveGalleryItems(items: GalleryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function addGalleryItem(data: { title: string; category: string; imageUrl: string }): Promise<GalleryItem[]> {
  try {
    const created = await apiClient.post<any>('/gallery', data)
    const newItem = normalizeGalleryItem(created)
    const updated = [newItem, ...getGalleryItems()]
    saveGalleryItems(updated)
    return updated
  } catch (err) {
    console.error('Failed to add gallery item via API:', err)
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      ...data,
      uploadedAt: new Date().toISOString().slice(0, 10),
    }
    const updated = [newItem, ...getGalleryItems()]
    saveGalleryItems(updated)
    return updated
  }
}

export async function deleteGalleryItem(id: string): Promise<GalleryItem[]> {
  try {
    await apiClient.delete(`/gallery/${id}`)
  } catch (err) {
    console.error(`Failed to delete gallery item ${id} via API:`, err)
  }
  const updated = getGalleryItems().filter((item) => item.id !== id)
  saveGalleryItems(updated)
  return updated
}

