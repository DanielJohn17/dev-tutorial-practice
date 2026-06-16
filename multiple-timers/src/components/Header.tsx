import { Timer } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { Theme } from '@/hooks/useTheme'

interface HeaderProps {
  theme: Theme
  setTheme: (t: Theme) => void
}

export function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="flex flex-col items-center gap-2 py-8">
      <div className="flex items-center gap-3">
        <Timer className="h-6 w-6 text-emerald-500" />
        <h1 className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
          Multiple Timers
        </h1>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
      <p className="text-center text-sm text-slate-400 dark:text-slate-500">
        Manage multiple timers and stopwatches at once
      </p>
    </header>
  )
}
