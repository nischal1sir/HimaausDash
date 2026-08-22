// The top of the app. In plain words, what happens here:
//   - If the person isn't logged in yet, show the login page — no matter
//     what page they typed into the address bar.
//   - Once logged in, hand off to AppRoutes.tsx, which decides which page
//     to show based on the current URL.

import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import AppRoutes from './AppRoutes'
import { AUTH_STORAGE_KEY } from './authConfig'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DashboardErrorBoundary } from './components/DashboardErrorBoundary'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(auth === 'true')
    setIsLoading(false)
  }, [])

  function handleLoginSuccess() {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsAuthenticated(true)
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      {!isAuthenticated ? (
        <LoginPage onSuccess={handleLoginSuccess} />
      ) : (
        <DashboardErrorBoundary>
          <AppRoutes onLogout={handleLogout} />
        </DashboardErrorBoundary>
      )}
    </ErrorBoundary>
  )
}





