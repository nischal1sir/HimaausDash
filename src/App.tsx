// The top of the app. In plain words, what happens here:
//   - If the person isn't logged in yet, show the login page — no matter
//     what page they typed into the address bar.
//   - Once logged in, hand off to AppRoutes.tsx, which decides which page
//     to show based on the current URL.

import { useState } from 'react'
import LoginPage from './components/LoginPage'
import AppRoutes from './AppRoutes'
import { AUTH_STORAGE_KEY } from './authConfig'

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

  return <AppRoutes onLogout={handleLogout} />
}
