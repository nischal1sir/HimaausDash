// Every route in the app lives here, in one place.
//
// In plain words: this file is the "map" — it says which URL shows which
// page. If you ever want to see (or change) what page an address goes to,
// this is the only file you need to open.

import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import OverviewPage from './components/OverviewPage'
import DirectorMessagePage from './components/DirectorMessage'
import PlaceholderPage from './components/PlaceholderPage'
import { navSections } from './data'
import { buildRouteList } from './lib/routes'

// Every sidebar link, turned into a { path, label } pair.
const allRoutes = buildRouteList(navSections)

// Paths that already have a real page built for them (see below). Every
// other path in allRoutes falls back to the "coming soon" placeholder.
const builtInPaths = new Set(['/', '/director-message'])

interface AppRoutesProps {
  onLogout: () => void
}

export default function AppRoutes({ onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={onLogout} />}>
        {/* Pages with real, built content */}
        <Route path="/" element={<OverviewPage />} />
        <Route path="/director-message" element={<DirectorMessagePage />} />

        {/* Every other sidebar link still works as a real page — it just
            shows a simple "coming soon" placeholder until it's built. */}
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
}
