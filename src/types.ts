import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  icon: LucideIcon
  hasChildren?: boolean
  badge?: number
  subItems?: string[]
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface StatCardData {
  label: string
  value: number | string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export interface CountryStat {
  country: string
  flag: string
  students: number
  percent: number
}

export interface MonthlyApplication {
  month: string
  applications: number
}

export interface StatisticPoint {
  label: string
  eligibility: number
  appointments: number
}

export interface DirectorMessage {
  id: string
  name: string
  designation: string
  message: string
  updatedAt: string
}

export interface FAQItem {
  question: string
  answer: string
}
