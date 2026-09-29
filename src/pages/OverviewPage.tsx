// The "home page" of the dashboard — the stat cards + charts that used to
// live directly inside App.tsx. Pulling it into its own file makes it a
// normal page that the router can send people to at "/".

import { useState, useEffect } from 'react'
import StatCard from '../components/StatCard'
import ApplicationsChart from '../components/charts/ApplicationsChart'
import CountryDistribution from '../components/charts/CountryDistribution'
import StatisticsChart from '../components/charts/StatisticsChart'
import { GraduationCap, MessageCircle, CalendarDays, FileText, Headphones } from 'lucide-react'
import { apiClient } from '../services/apiClient'
import { getDashboardStats as getLocalDashboardStats } from '../lib/dashboardStats'

interface BackendStats {
  totalEligibility: number
  totalLeads: number
  totalAppointments: number
  totalBlogs: number
  totalPodcasts: number
}

export default function OverviewPage() {
  const [stats, setStats] = useState<BackendStats | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiClient.get<BackendStats>('/dashboard/stats')
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch dashboard stats from API, using fallback:', err)
      }
    }
    fetchStats()
  }, [])

  const localStats = getLocalDashboardStats()

  const statCards = [
    {
      label: 'Total Eligibility Students',
      value: stats ? stats.totalEligibility : localStats[0]?.value || 0,
      icon: GraduationCap,
      iconBg: 'bg-brand-50',
      iconColor: 'text-brand-600',
    },
    {
      label: 'Total Leads / Inquiries',
      value: stats ? stats.totalLeads : localStats[1]?.value || 0,
      icon: MessageCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Total Appointments',
      value: stats ? stats.totalAppointments : localStats[2]?.value || 0,
      icon: CalendarDays,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-500',
    },
    {
      label: 'Total Blogs',
      value: stats ? stats.totalBlogs : localStats[3]?.value || 0,
      icon: FileText,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
    },
    {
      label: 'Total Podcasts',
      value: stats ? stats.totalPodcasts : localStats[4]?.value || 0,
      icon: Headphones,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Applications chart + Country distribution */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-[1.4fr_1fr]">
        <ApplicationsChart />
        <CountryDistribution />
      </div>

      {/* Statistics area chart */}
      <StatisticsChart />
    </div>
  )
}
