import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { AUTH_CREDENTIALS } from '../authConfig'
import logo from "../assets/image/download.png"
import loginBg from "../assets/image/photo.webp"

interface LoginPageProps {
  onSuccess: () => void
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    // Tiny delay so the button's loading state is visible — feels less abrupt.
    setTimeout(() => {
      if (
        username.trim() === AUTH_CREDENTIALS.username &&
        password === AUTH_CREDENTIALS.password
      ) {
        onSuccess()
      } else {
        setError('Incorrect username or password.')
        setSubmitting(false)
      }
    }, 300)
  }

  return (
  <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

    {/* Left Side */}
    <div className="relative hidden lg:flex items-center justify-center overflow-hidden"
    style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",}}>

      <div className="absolute inset-0 bg-blue-900/70"></div>

      <div className="relative z-10 max-w-md px-10 text-white">
        <h1 className="text-5xl font-bold leading-tight">
          Your Journey
          <br />
          Starts Here
        </h1>

        <p className="mt-6 text-lg text-blue-100 leading-8">
          Manage students, appointments, visa services, blogs and content
          from one modern dashboard.
        </p>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex items-center justify-center p-8">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

        <div className="text-center">

          <img
            src={logo}
            alt="Himaaus"
            className="mx-auto w-40"
          />

          <h2 className="mt-6 text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="mt-2 text-slate-500">
            Sign in to continue to your dashboard.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Username
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

            </div>
          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>

    </div>

  </div>
)
}
