import { useState } from 'react'
import { Flag, Pause, Play, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useStopwatchStore } from '@/stores/stopwatchStore'
import { cn, formatMs } from '@/lib/utils'

interface StopwatchCardProps {
  id: string
}

export function StopwatchCard({ id }: StopwatchCardProps) {
  const sw = useStopwatchStore((s) => s.stopwatches[id])
  const start = useStopwatchStore((s) => s.startStopwatch)
  const pause = useStopwatchStore((s) => s.pauseStopwatch)
  const reset = useStopwatchStore((s) => s.resetStopwatch)
  const lap = useStopwatchStore((s) => s.lapStopwatch)
  const remove = useStopwatchStore((s) => s.removeStopwatch)
  const rename = useStopwatchStore((s) => s.renameStopwatch)

  const [editing, setEditing] = useState(false)
  const [labelDraft, setLabelDraft] = useState('')
  const [showLaps, setShowLaps] = useState(false)

  if (!sw) return null

  const handleStartEdit = () => {
    setLabelDraft(sw.label)
    setEditing(true)
  }

  const handleSaveLabel = () => {
    if (labelDraft.trim()) {
      rename(id, labelDraft.trim())
    }
    setEditing(false)
  }

  return (
    <Card className="group/card animate-slide-up relative overflow-hidden border p-4 transition-all duration-300">
      <button
        className="absolute right-2 top-2 z-10 cursor-pointer rounded p-1 text-slate-500 opacity-0 transition-opacity hover:bg-slate-800 hover:text-red-400 group-hover/card:opacity-100"
        onClick={() => remove(id)}
        title="Delete stopwatch"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center">
          <span
            className={cn(
              'text-3xl font-bold tabular-nums tracking-tight',
              sw.status === 'running' && 'text-cyan-400',
            )}
          >
            {formatMs(sw.elapsed)}
          </span>
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
            {sw.label}
          </button>
        )}

        <div className="flex gap-2">
          {sw.status === 'running' ? (
            <>
              <Button size="icon" variant="secondary" onClick={() => pause(id)} className="h-9 w-9 rounded-full">
                <Pause className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => lap(id)} className="h-9 w-9 rounded-full">
                <Flag className="h-4 w-4" />
              </Button>
            </>
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

        {sw.laps.length > 0 && (
          <div className="w-full">
            <button
              className="flex w-full items-center justify-center gap-1 text-xs text-slate-500 hover:text-slate-300"
              onClick={() => setShowLaps(!showLaps)}
            >
              <Flag className="h-3 w-3" />
              {sw.laps.length} {sw.laps.length === 1 ? 'lap' : 'laps'}
            </button>
            {showLaps && (
              <div className="mt-2 max-h-32 space-y-1 overflow-y-auto">
                {sw.laps.map((lapTime, i) => (
                  <div
                    key={i}
                    className="flex justify-between rounded bg-slate-800/50 px-3 py-1 text-xs tabular-nums text-slate-400"
                  >
                    <span>
                      Lap {i + 1}
                      {i === sw.laps.length - 1 && sw.status === 'running' ? ' (current)' : ''}
                    </span>
                    <span>{formatMs(lapTime)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
