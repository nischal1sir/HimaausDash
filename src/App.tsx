import { Route, Routes } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import OverviewPage from './components/OverviewPage'
import DirectorMessagePage from './components/DirectorMessage'
import PlaceholderPage from './components/PlaceholderPage'

import FAQPage from './pages/FAQ';
import NoticePage from './pages/Notice'

import { navSections } from './data'
import { buildRouteList } from './lib/routes'

const allRoutes = buildRouteList(navSections)

const builtInPaths = new Set([
  '/',
  '/director-message',
  '/faq',
  '/notice',
])

interface AppRoutesProps {
  onLogout: () => void
}

export default function AppRoutes({ onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={onLogout} />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/director-message" element={<DirectorMessagePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/notice" element={<NoticePage />} />

        {allRoutes
          .filter((route) => !builtInPaths.has(route.path))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage title={route.label} />}
            />
          ))}
      </Route>
    </Routes>
  )
}AppRoutes
