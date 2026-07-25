import { Bell, Menu, PanelLeft, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  userName: string
  onOpenMobileSidebar: () => void
  onToggleCollapse: () => void
}

export default function Topbar({ title, userName, onOpenMobileSidebar, onToggleCollapse }: TopbarProps) {
  const initial = userName.charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-20 flex h-[65px] shrink-0 items-center justify-between gap-3 border-b border-surface-border bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-2.5">
        <button
          onClick={onOpenMobileSidebar}
          className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={19} />
        </button>
        <button
          onClick={onToggleCollapse}
          className="hidden shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:block"
          aria-label="Toggle sidebar width"
        >
          <PanelLeft size={18} />
        </button>
        <h1 className="truncate text-[15px] font-bold text-surface-heading sm:text-base">{title}</h1>
      </div>

      {/* Search — desktop only */}
      <div className="hidden max-w-sm flex-1 md:block">
        <label className="relative block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-3 text-[13px] text-slate-600 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          className="relative rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="mx-1 hidden h-6 w-px bg-surface-border sm:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[13px] font-bold text-white">
            {initial}
          </div>
          <p className="hidden text-[13px] text-slate-500 md:block">
            Welcome back, <span className="font-semibold text-surface-heading">{userName}</span>
          </p>
        </div>

        <button className="rounded-lg border border-surface-border px-3 py-1.5 text-[12.5px] font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 sm:px-3.5 sm:text-[13px]">
          Logout
        </button>
      </div>
    </header>
  )
}
