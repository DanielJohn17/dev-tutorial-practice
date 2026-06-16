export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface Timer {
  id: string
  label: string
  duration: number
  remaining: number
  status: TimerStatus
  startedAt: number | null
  pausedOffset: number
  createdAt: number
}

export interface Stopwatch {
  id: string
  label: string
  elapsed: number
  status: Exclude<TimerStatus, 'completed'>
  startedAt: number | null
  pausedOffset: number
  laps: number[]
  createdAt: number
}
