import type { FAQItem } from '../types'
import apiClient from '../services/apiClient'

const STORAGE_KEY = 'himaaus-dash-faq-items'

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I submit a new application?',
    answer:
      'Use the Eligibility > Submissions page to add student applications and track their status.',
  },
  {
    id: 'faq-2',
    question: 'Where can I add a new notice?',
    answer: 'Go to Content Management > Notice > Add Notice to publish announcements.',
  },
]

function normalizeFAQ(item: any): FAQItem {
  return {
    id: item._id || item.id || `faq-${Date.now()}`,
    question: item.question || '',
    answer: item.answer || '',
  }
}

export function getFAQs(): FAQItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_FAQS
    return JSON.parse(raw) as FAQItem[]
  } catch {
    return DEFAULT_FAQS
  }
}

export async function fetchFAQs(): Promise<FAQItem[]> {
  try {
    const data = await apiClient.get<any[]>('/faqs')
    if (Array.isArray(data)) {
      const normalized = data.map(normalizeFAQ)
      saveFAQs(normalized)
      return normalized
    }
  } catch (err) {
    console.error('Failed to fetch FAQs from API:', err)
  }
  return getFAQs()
}

function saveFAQs(items: FAQItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function addFAQ(question: string, answer: string): Promise<FAQItem[]> {
  try {
    const created = await apiClient.post<any>('/faqs', { question, answer })
    const newFAQ = normalizeFAQ(created)
    const updated = [newFAQ, ...getFAQs()]
    saveFAQs(updated)
    return updated
  } catch (err) {
    console.error('Failed to add FAQ via API:', err)
    const newFAQ: FAQItem = {
      id: `faq-${Date.now()}`,
      question,
      answer,
    }
    const updated = [newFAQ, ...getFAQs()]
    saveFAQs(updated)
    return updated
  }
}

export async function deleteFAQ(id: string): Promise<FAQItem[]> {
  try {
    await apiClient.delete(`/faqs/${id}`)
  } catch (err) {
    console.error(`Failed to delete FAQ ${id} via API:`, err)
  }
  const updated = getFAQs().filter((item) => item.id !== id)
  saveFAQs(updated)
  return updated
}

