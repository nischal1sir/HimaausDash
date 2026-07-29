// Every route in the app lives here, in one place.
//
// In plain words: this file is the "map" — it says which URL shows which
// page. If you ever want to see (or change) what page an address goes to,
// this is the only file you need to open.

import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import OverviewPage from './pages/OverviewPage'
import DirectorMessagePage from './pages/DirectorMessagePage'
import AllEpisodesPage from './pages/podcast/AllEpisodesPage'
import AddEpisodePage from './pages/podcast/AddEpisodePage'
import PlaceholderPage from './pages/PlaceholderPage'
import { navSections } from './data'
import { buildRouteList } from './lib/routes'
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import ContactUsPage from './components/Contact-us/ContactUsPage'
import AllPostsPage from './pages/blog/AllPostsPage'
import NewPostPage from './pages/blog/NewPostPage'
import EditPostPage from './pages/blog/EditPostPage'

// Every sidebar link, turned into a { path, label } pair.
const allRoutes = buildRouteList(navSections)

// Paths that already have a real page built for them (see below). Every
// other path in allRoutes falls back to the "coming soon" placeholder.
const builtInPaths = new Set([
  '/',
  '/director-message',
  '/podcast/all-episodes',
  '/podcast/add-episode',
  '/blog-posts/all-posts',
  '/blog-posts/new-post',
])

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
        <Route path="/podcast/all-episodes" element={<AllEpisodesPage />} />
        <Route path="/podcast/add-episode" element={<AddEpisodePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/contacts" element={<ContactUsPage />} />
        <Route path="/blog-posts/all-posts" element={<AllPostsPage />} />
        <Route path="/blog-posts/new-post" element={<NewPostPage />} />
        <Route path="/blog-posts/edit/:id" element={<EditPostPage />} />

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
