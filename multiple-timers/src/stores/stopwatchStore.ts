import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Stopwatch } from '@/types'

let nextId = 1

interface StopwatchStore {
  stopwatches: Record<string, Stopwatch>
  addStopwatch: () => string
  removeStopwatch: (id: string) => void
  startStopwatch: (id: string) => void
  pauseStopwatch: (id: string) => void
  resetStopwatch: (id: string) => void
  lapStopwatch: (id: string) => void
  renameStopwatch: (id: string, label: string) => void
  tick: () => void
}

export const useStopwatchStore = create<StopwatchStore>()(
  persist(
    (set, get) => ({
      stopwatches: {},

      addStopwatch: () => {
        const id = `sw-${nextId++}`
        const sw: Stopwatch = {
          id,
          label: `Stopwatch ${Object.keys(get().stopwatches).length + 1}`,
          elapsed: 0,
          status: 'idle',
          startedAt: null,
          pausedOffset: 0,
          laps: [],
          createdAt: Date.now(),
        }
        set((s) => ({ stopwatches: { ...s.stopwatches, [id]: sw } }))
        return id
      },

      removeStopwatch: (id: string) => {
        set((s) => {
          const next = { ...s.stopwatches }
          delete next[id]
          return { stopwatches: next }
        })
      },

      startStopwatch: (id: string) => {
        set((s) => {
          const sw = s.stopwatches[id]
          if (!sw) return s
          return {
            stopwatches: {
              ...s.stopwatches,
              [id]: { ...sw, status: 'running', startedAt: Date.now() },
            },
          }
        })
      },

      pauseStopwatch: (id: string) => {
        set((s) => {
          const sw = s.stopwatches[id]
          if (!sw || sw.status !== 'running') return s
          const now = Date.now()
          const addElapsed = sw.startedAt ? now - sw.startedAt : 0
          return {
            stopwatches: {
              ...s.stopwatches,
              [id]: {
                ...sw,
                status: 'paused',
                elapsed: sw.elapsed + addElapsed,
                startedAt: null,
              },
            },
          }
        })
      },

      resetStopwatch: (id: string) => {
        set((s) => {
          const sw = s.stopwatches[id]
          if (!sw) return s
          return {
            stopwatches: {
              ...s.stopwatches,
              [id]: { ...sw, elapsed: 0, status: 'idle', startedAt: null, pausedOffset: 0, laps: [] },
            },
          }
        })
      },

      lapStopwatch: (id: string) => {
        set((s) => {
          const sw = s.stopwatches[id]
          if (!sw || sw.status !== 'running') return s
          const now = Date.now()
          const currentElapsed = sw.elapsed + (sw.startedAt ? now - sw.startedAt : 0)
          return {
            stopwatches: {
              ...s.stopwatches,
              [id]: { ...sw, laps: [...sw.laps, currentElapsed] },
            },
          }
        })
      },

      renameStopwatch: (id: string, label: string) => {
        set((s) => {
          const sw = s.stopwatches[id]
          if (!sw) return s
          return {
            stopwatches: {
              ...s.stopwatches,
              [id]: { ...sw, label },
            },
          }
        })
      },

      tick: () => {
        const { stopwatches } = get()
        const now = Date.now()
        const updated: Record<string, Stopwatch> = {}

        for (const sw of Object.values(stopwatches)) {
          if (sw.status !== 'running') continue
          const addElapsed = sw.startedAt ? now - sw.startedAt : 0
          updated[sw.id] = { ...sw, elapsed: sw.elapsed + addElapsed, startedAt: now }
        }

        if (Object.keys(updated).length > 0) {
          set({ stopwatches: { ...stopwatches, ...updated } })
        }
      },
    }),
    { name: 'stopwatch-store' },
  ),
)
