import { useState } from 'react'
import { Clock, Pause, Play, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTimerStore } from '@/stores/timerStore'
import { cn, formatTime } from '@/lib/utils'

interface TimerCardProps {
  id: string
}

export function TimerCard({ id }: TimerCardProps) {
  const timer = useTimerStore((s) => s.timers[id])
  const start = useTimerStore((s) => s.startTimer)
  const pause = useTimerStore((s) => s.pauseTimer)
  const reset = useTimerStore((s) => s.resetTimer)
  const remove = useTimerStore((s) => s.removeTimer)
  const rename = useTimerStore((s) => s.renameTimer)

  const [editing, setEditing] = useState(false)
  const [labelDraft, setLabelDraft] = useState('')

  if (!timer) return null

  const percentage = timer.duration > 0 ? (timer.remaining / timer.duration) * 100 : 0
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (percentage / 100) * circumference

  const handleStartEdit = () => {
    setLabelDraft(timer.label)
    setEditing(true)
  }

  const handleSaveLabel = () => {
    if (labelDraft.trim()) {
      rename(id, labelDraft.trim())
    }
    setEditing(false)
  }

  return (
    <Card
      className={cn(
        'group/card animate-slide-up relative overflow-hidden border p-4 transition-all duration-300',
        timer.status === 'completed' && 'border-amber-500/40',
        timer.status === 'running' && 'border-emerald-500/30',
      )}
      style={{ animationDelay: '0s' }}
    >
      <button
        className="absolute right-2 top-2 z-10 cursor-pointer rounded p-1 text-slate-500 opacity-0 transition-opacity hover:bg-slate-800 hover:text-red-400 group-hover/card:opacity-100"
        onClick={() => remove(id)}
        title="Delete timer"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <svg className="-rotate-90" width="130" height="130" viewBox="0 0 130 130">
            <circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke="oklch(0.279 0.041 260.031)"
              strokeWidth="6"
            />
            <circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke={
                timer.status === 'completed'
                  ? 'oklch(0.769 0.188 70.08)'
                  : timer.status === 'running'
                    ? 'oklch(0.696 0.17 162.48)'
                    : 'oklch(0.704 0.14 182.503)'
              }
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span
              className={cn(
                'text-2xl font-bold tabular-nums tracking-tight',
                timer.status === 'completed' && 'text-amber-400',
                timer.status === 'running' && 'text-emerald-400',
              )}
            >
              {formatTime(timer.remaining)}
            </span>
            {timer.status === 'completed' && (
              <span className="text-xs text-amber-400/80">Done!</span>
            )}
          </div>
        </div>

        {editing ? (
          <Input
            value={labelDraft}
            onChange={(e) => setLabelDraft(e.target.value)}
            onBlur={handleSaveLabel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveLabel()
              if (e.key === 'Escape') setEditing(false)
            }}
            className="h-7 text-center text-sm"
            autoFocus
          />
        ) : (
          <button
            className="cursor-pointer text-sm text-slate-400 hover:text-slate-200"
            onClick={handleStartEdit}
            title="Edit label"
          >
            {timer.label}
          </button>
        )}

        {timer.status !== 'completed' && (
          <div className="flex gap-2">
            {timer.status === 'running' ? (
              <Button size="icon" variant="secondary" onClick={() => pause(id)} className="h-9 w-9 rounded-full">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="icon" onClick={() => start(id)} className="h-9 w-9 rounded-full">
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="outline"
              onClick={() => reset(id)}
              className="h-9 w-9 rounded-full"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {timer.status === 'completed' && (
          <Button variant="outline" size="sm" onClick={() => reset(id)} className="gap-1">
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </Button>
        )}

        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Clock className="h-3 w-3" />
          {formatTime(timer.duration)}
        </div>
      </div>
    </Card>
  )
}
