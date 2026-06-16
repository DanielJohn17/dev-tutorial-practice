import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Timer } from '@/types'

let nextId = 1

interface TimerStore {
  timers: Record<string, Timer>
  addTimer: (duration: number) => string
  removeTimer: (id: string) => void
  startTimer: (id: string) => void
  pauseTimer: (id: string) => void
  resetTimer: (id: string) => void
  renameTimer: (id: string, label: string) => void
  tick: () => string | null
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timers: {},

      addTimer: (duration: number) => {
        const id = `timer-${nextId++}`
        const timer: Timer = {
          id,
          label: `Timer ${Object.keys(get().timers).length + 1}`,
          duration,
          remaining: duration,
          status: 'idle',
          startedAt: null,
          pausedOffset: 0,
          createdAt: Date.now(),
        }
        set((s) => ({ timers: { ...s.timers, [id]: timer } }))
        return id
      },

      removeTimer: (id: string) => {
        set((s) => {
          const next = { ...s.timers }
          delete next[id]
          return { timers: next }
        })
      },

      startTimer: (id: string) => {
        set((s) => {
          const t = s.timers[id]
          if (!t || t.status === 'completed') return s
          return {
            timers: {
              ...s.timers,
              [id]: {
                ...t,
                status: 'running',
                startedAt: Date.now(),
              },
            },
          }
        })
      },

      pauseTimer: (id: string) => {
        set((s) => {
          const t = s.timers[id]
          if (!t || t.status !== 'running') return s
          const now = Date.now()
          const elapsed = t.startedAt ? Math.floor((now - t.startedAt) / 1000) : 0
          return {
            timers: {
              ...s.timers,
              [id]: {
                ...t,
                status: 'paused',
                remaining: Math.max(0, t.remaining - elapsed),
                startedAt: null,
                pausedOffset: 0,
              },
            },
          }
        })
      },

      resetTimer: (id: string) => {
        set((s) => {
          const t = s.timers[id]
          if (!t) return s
          return {
            timers: {
              ...s.timers,
              [id]: {
                ...t,
                remaining: t.duration,
                status: 'idle',
                startedAt: null,
                pausedOffset: 0,
              },
            },
          }
        })
      },

      renameTimer: (id: string, label: string) => {
        set((s) => {
          const t = s.timers[id]
          if (!t) return s
          return {
            timers: {
              ...s.timers,
              [id]: { ...t, label },
            },
          }
        })
      },

      tick: () => {
        const { timers } = get()
        let completedId: string | null = null
        const now = Date.now()
        const updated: Record<string, Timer> = {}

        for (const t of Object.values(timers)) {
          if (t.status !== 'running') continue
          const elapsedSinceStart = t.startedAt ? Math.floor((now - t.startedAt) / 1000) : 0
          const remaining = Math.max(0, t.duration - t.pausedOffset - elapsedSinceStart)
          if (remaining <= 0 && t.status === 'running') {
            updated[t.id] = { ...t, remaining: 0, status: 'completed', startedAt: null }
            completedId = t.id
          } else {
            updated[t.id] = { ...t, remaining }
          }
        }

        if (Object.keys(updated).length > 0) {
          set({ timers: { ...timers, ...updated } })
        }

        return completedId
      },
    }),
    { name: 'timer-store' },
  ),
)
