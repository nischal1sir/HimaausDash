// Simple client-side login gate for the dashboard.
//
// NOTE: This is NOT secure authentication. The credentials below live in the
// bundled JS, so anyone can read them by inspecting the built site. It's
// meant to keep casual visitors out, not to protect sensitive data. If you
// need real authentication, wire this up to a backend/auth provider
// (Supabase, Firebase Auth, Auth0, your own API, etc.) instead.

export const AUTH_CREDENTIALS = {
  username: import.meta.env['VITE_AUTH_USERNAME'] || 'admin',
  password: import.meta.env['VITE_AUTH_PASSWORD'] || 'himaaus2026',
}

export const AUTH_STORAGE_KEY = 'himaaus-dash-auth'
