import {
  LayoutGrid,
  FileText,
  Users,
  Star,
  Image,
  CalendarDays,
  HelpCircle,
  Headphones,
  Target,
  ListChecks,
  MessageSquare,
  Bell,
  CalendarCheck,
  Mail,
  UserCircle2,
  GraduationCap,
  MessageCircle,
} from 'lucide-react'
import type {
  NavSection,
  StatCardData,
  CountryStat,
  MonthlyApplication,
  StatisticPoint,
  DirectorMessage,
} from './types'

export const navSections: NavSection[] = [
  {
    title: 'Dashboard',
    items: [{ label: 'Overview', icon: LayoutGrid, path: '/' }],
  },
  {
    title: 'Content Management',
    items: [
      { label: 'Blog Posts', icon: FileText, hasChildren: true, subItems: ['All Posts', 'Add New'] },
      { label: 'Partners', icon: Users, hasChildren: true, subItems: ['All Partners', 'Add Partner'] },
      { label: 'Testimonials', icon: Star, hasChildren: true, subItems: ['All Testimonials', 'Add New'] },
      { label: 'Gallery', icon: Image, hasChildren: true, subItems: ['All Media', 'Upload'] },
      { label: 'Events', icon: CalendarDays, hasChildren: true, subItems: ['Upcoming', 'Past Events', 'Add Event'] },
      { label: 'FAQ', icon: HelpCircle, hasChildren: true, subItems: ['All FAQs', 'Add FAQ'] },
      { label: 'Podcast', icon: Headphones, hasChildren: true, subItems: ['All Episodes', 'Add Episode'] },
      { label: 'Milestones', icon: Target, hasChildren: true, subItems: ['All Milestones', 'Add Milestone'] },
      { label: 'Eligibility', icon: ListChecks, hasChildren: true, subItems: ['Submissions', 'Criteria'] },
      { label: 'Director Message', icon: MessageSquare },
      { label: 'Notice', icon: Bell, hasChildren: true, subItems: ['All Notices', 'Add Notice'] },
    ],
  },
  {
    title: 'Services & Appointments',
    items: [
      { label: 'Appointments', icon: CalendarCheck, path: '/appointments' },
      { label: 'Contacts', icon: Mail, path: '/contacts' },
    ],
  },
  {
    title: 'Team Management',
    items: [{ label: 'Team Profiles', icon: UserCircle2, hasChildren: true, subItems: ['All Members', 'Add Member'] }],
  },
]

export const statCards: StatCardData[] = [
  {
    label: 'Total Eligibility Students',
    value: 3,
    icon: GraduationCap,
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    label: 'Total Leads / Inquiries',
    value: 20,
    icon: MessageCircle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    label: 'Total Appointments',
    value: 12,
    icon: CalendarDays,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
  },
  {
    label: 'Total Blogs',
    value: 2,
    icon: FileText,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
  {
    label: 'Total Podcasts',
    value: 4,
    icon: Headphones,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
]

export const countryStats: CountryStat[] = [
  { country: 'Australia', flag: '🇦🇺', students: 1, percent: 33 },
  { country: 'Nepal', flag: '🇳🇵', students: 1, percent: 33 },
  { country: 'USA', flag: '🇺🇸', students: 1, percent: 33 },
]

export const monthlyApplications: MonthlyApplication[] = [
  { month: 'Feb', applications: 0 },
  { month: 'Mar', applications: 0 },
  { month: 'Apr', applications: 0 },
  { month: 'May', applications: 0 },
  { month: 'Jun', applications: 0 },
  { month: 'Jul', applications: 2 },
]

export const statisticsData: StatisticPoint[] = [
  { label: 'Feb', eligibility: 0, appointments: 0 },
  { label: 'Mar', eligibility: 0, appointments: 1 },
  { label: 'Apr', eligibility: 0, appointments: 2 },
  { label: 'May', eligibility: 1, appointments: 4 },
  { label: 'Jun', eligibility: 2, appointments: 7 },
  { label: 'Jul', eligibility: 3, appointments: 10 },
]

export const directorMessages: DirectorMessage[] = [
  {
    id: 'dm-1',
    name: 'Rajesh Sharma',
    designation: 'Founding Director',
    message:
      'Welcome to Himaaus Education. Our mission is to guide every student toward the right university and the right country for their future, with honest advice at every step.',
    updatedAt: '2026-06-12',
  },
]
