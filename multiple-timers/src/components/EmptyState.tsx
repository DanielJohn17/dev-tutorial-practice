import { Clock, Timer } from 'lucide-react'

interface EmptyStateProps {
  type: 'timer' | 'stopwatch'
}

export function EmptyState({ type }: EmptyStateProps) {
  const isTimer = type === 'timer'

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
        {isTimer ? (
          <Timer className="h-10 w-10 text-emerald-400/60" />
        ) : (
          <Clock className="h-10 w-10 text-cyan-400/60" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-slate-300">
          No {isTimer ? 'timers' : 'stopwatches'} yet
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Tap the <span className="text-emerald-400">+</span> button below to add one
        </p>
      </div>
    </div>
  )
}
