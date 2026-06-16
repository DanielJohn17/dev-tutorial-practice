import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Theme } from '@/hooks/useTheme'

const next: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Sun,
}

interface ThemeSwitcherProps {
  theme: Theme
  setTheme: (t: Theme) => void
}

export function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const Icon = icons[theme]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next[theme])}
      className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
      title={`Theme: ${theme}. Click for ${next[theme]}`}
    >
      {theme === 'system' ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ) : (
        <Icon className="h-4 w-4" />
      )}
    </Button>
  )
}
