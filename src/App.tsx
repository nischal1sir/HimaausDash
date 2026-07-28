import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import LoginPage from './components/LoginPage'
import OverviewPage from './components/OverviewPage'
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import ContactUsPage from './components/Contact-us/ContactUsPage'
import { AUTH_STORAGE_KEY } from './authConfig'

function getTitleFromPath(pathname: string): string {
  switch (pathname) {
    case '/appointments':
      return 'Appointments'
    case '/contacts':
      return 'Contact Us'
    case '/':
    default:
      return 'Overview'
  }
}

function MainLayout({ onLogout }: { onLogout: () => void }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const currentTitle = getTitleFromPath(location.pathname)

  return (
    <div className="flex min-h-screen bg-surface-bg">
      <Sidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        collapsed={collapsed}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar
          title={currentTitle}
          userName="himaaus-edu"
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onLogout={onLogout}
        />

        <main className="flex-1 space-y-4 px-3.5 py-4 sm:space-y-5 sm:px-6 sm:py-6">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/contacts" element={<ContactUsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
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
    <BrowserRouter>
      <MainLayout onLogout={handleLogout} />
    </BrowserRouter>
  )
}
