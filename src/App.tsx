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
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
    const authFlag = localStorage.getItem(AUTH_STORAGE_KEY)

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1]
        if (payloadBase64) {
          const payload = JSON.parse(atob(payloadBase64))
          if (payload.exp && Date.now() >= payload.exp * 1000) {
            localStorage.removeItem('token')
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            localStorage.removeItem(AUTH_STORAGE_KEY)
            setIsAuthenticated(false)
            setIsLoading(false)
            return
          }
        }
      } catch {
        // format ignored
      }
      setIsAuthenticated(true)
    } else if (authFlag === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [])

  function handleLoginSuccess() {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsAuthenticated(true)
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem('token')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
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





