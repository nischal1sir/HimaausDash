import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatCard from './components/StatCard'
import LoginPage from './components/LoginPage'
import ApplicationsChart from './components/charts/ApplicationsChart'
import CountryDistribution from './components/charts/CountryDistribution'
import StatisticsChart from './components/charts/StatisticsChart'
import { statCards } from './data'
import { AUTH_STORAGE_KEY } from './authConfig'

export default function App() {
  const [activeLabel, setActiveLabel] = useState('Overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
  )

  function handleLoginSuccess() {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsAuthenticated(true)
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginPage onSuccess={handleLoginSuccess} />
  }

  return (
    <div className="flex min-h-screen bg-surface-bg">
      <Sidebar
        activeLabel={activeLabel}
        onSelect={(label) => {
          setActiveLabel(label)
          setMobileSidebarOpen(false)
        }}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        collapsed={collapsed}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar
          title={activeLabel}
          userName="himaaus-edu"
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onLogout={handleLogout}
        />

        <main className="flex-1 space-y-4 px-3.5 py-4 sm:space-y-5 sm:px-6 sm:py-6">
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
        </main>
      </div>
    </div>
  )
}
