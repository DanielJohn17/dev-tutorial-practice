import { useTimerStore } from '@/stores/timerStore'
import { TimerCard } from './TimerCard'

export function TimerList() {
  const timers = useTimerStore((s) => s.timers)
  const ids = Object.keys(timers)

  if (ids.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => (
        <TimerCard key={id} id={id} />
      ))}
    </div>
  )
}
