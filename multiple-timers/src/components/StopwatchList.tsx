import { useStopwatchStore } from '@/stores/stopwatchStore'
import { StopwatchCard } from './StopwatchCard'

export function StopwatchList() {
  const stopwatches = useStopwatchStore((s) => s.stopwatches)
  const ids = Object.keys(stopwatches)

  if (ids.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => (
        <StopwatchCard key={id} id={id} />
      ))}
    </div>
  )
}
