// Where podcast episodes are kept.
//
// In plain words: "All Episodes" and "Add Episode" are two separate pages
// (two separate URLs), so they can't just share a normal useState — each
// page starts fresh when you navigate to it. Instead we save the episode
// list to the browser's localStorage, so:
//   - adding an episode on one page shows up when you go to the other
//   - the list survives a page refresh
//
// (Same "not a real database" caveat as everywhere else in this frontend-
// only project — this lives in the visitor's own browser, not a server.)

import type { PodcastEpisode } from '../types'
import apiClient from '../services/apiClient'

const STORAGE_KEY = 'himaaus-dash-podcast-episodes'
const DEFAULT_EPISODES: PodcastEpisode[] = []

function normalizeEpisode(item: any): PodcastEpisode {
  return {
    id: item._id || item.id || `ep-${Date.now()}`,
    title: item.title || '',
    videoUrl: item.videoUrl || item.url || item.youtubeUrl || '',
    addedAt: item.addedAt || item.createdAt || new Date().toISOString(),
  }
}

export function getEpisodes(): PodcastEpisode[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_EPISODES
    return JSON.parse(raw) as PodcastEpisode[]
  } catch {
    return DEFAULT_EPISODES
  }
}

export async function fetchEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const data = await apiClient.get<any[]>('/podcasts')
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeEpisode)
      saveEpisodes(normalized)
      return normalized
    }
  } catch (err) {
    console.error('Failed to fetch podcasts from API:', err)
  }
  return getEpisodes()
}

function saveEpisodes(episodes: PodcastEpisode[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes))
}

export async function addEpisode(title: string, videoUrl: string): Promise<PodcastEpisode[]> {
  try {
    const created = await apiClient.post<any>('/podcasts', { title, videoUrl })
    const newEpisode = normalizeEpisode(created)
    const updated = [newEpisode, ...getEpisodes()]
    saveEpisodes(updated)
    return updated
  } catch (err) {
    console.error('Failed to add podcast episode via API:', err)
    const newEpisode: PodcastEpisode = {
      id: `ep-${Date.now()}`,
      title,
      videoUrl,
      addedAt: new Date().toISOString(),
    }
    const updated = [newEpisode, ...getEpisodes()]
    saveEpisodes(updated)
    return updated
  }
}

export async function deleteEpisode(id: string): Promise<PodcastEpisode[]> {
  try {
    await apiClient.delete(`/podcasts/${id}`)
  } catch (err) {
    console.error(`Failed to delete podcast ${id} via API:`, err)
  }
  const updated = getEpisodes().filter((ep) => ep.id !== id)
  saveEpisodes(updated)
  return updated
}

