import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('timer-theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
    return 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && media.matches)
      root.classList.toggle('dark', isDark)
    }

    apply()
    localStorage.setItem('timer-theme', theme)

    const handler = () => {
      if (theme === 'system') apply()
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  return { theme, setTheme }
}
