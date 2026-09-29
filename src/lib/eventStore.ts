import type { EventItem } from '../types'
import apiClient from '../services/apiClient'

const STORAGE_KEY = 'himaaus-dash-events'
const DEFAULT_EVENTS: EventItem[] = []

function normalizeEvent(item: any): EventItem {
  return {
    id: item._id || item.id || `evt-${Date.now()}`,
    title: item.title || '',
    description: item.description || '',
    date: item.date || item.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    location: item.location || '',
    imageUrl: item.imageUrl || item.image || null,
    createdAt: item.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  }
}

export function getEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_EVENTS
    return JSON.parse(raw) as EventItem[]
  } catch {
    return DEFAULT_EVENTS
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const data = await apiClient.get<any[]>('/events')
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeEvent)
      saveEvents(normalized)
      return normalized
    }
  } catch (err) {
    console.error('Failed to fetch events from API:', err)
  }
  return getEvents()
}

function saveEvents(events: EventItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export async function addEvent(data: {
  title: string
  description: string
  date: string
  location: string
  imageUrl: string | null
}): Promise<EventItem[]> {
  try {
    const created = await apiClient.post<any>('/events', data)
    const newEvent = normalizeEvent(created)
    const updated = [newEvent, ...getEvents()]
    saveEvents(updated)
    return updated
  } catch (err) {
    console.error('Failed to create event via API:', err)
    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    const updated = [newEvent, ...getEvents()]
    saveEvents(updated)
    return updated
  }
}

export async function deleteEvent(id: string): Promise<EventItem[]> {
  try {
    await apiClient.delete(`/events/${id}`)
  } catch (err) {
    console.error(`Failed to delete event ${id} via API:`, err)
  }
  const updated = getEvents().filter((event) => event.id !== id)
  saveEvents(updated)
  return updated
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getUpcomingEvents(): EventItem[] {
  const today = todayISO()
  return getEvents()
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export async function fetchUpcomingEvents(): Promise<EventItem[]> {
  const events = await fetchEvents()
  const today = todayISO()
  return events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getPastEvents(): EventItem[] {
  const today = todayISO()
  return getEvents()
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function fetchPastEvents(): Promise<EventItem[]> {
  const events = await fetchEvents()
  const today = todayISO()
  return events
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
}

