import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTimerStore } from '@/stores/timerStore'

const presets = [
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '5m', value: 300 },
  { label: '15m', value: 900 },
  { label: '30m', value: 1800 },
  { label: '1h', value: 3600 },
]

export function AddTimerDialog() {
  const addTimer = useTimerStore((s) => s.addTimer)
  const [open, setOpen] = useState(false)
  const [customMinutes, setCustomMinutes] = useState('')
  const [customSeconds, setCustomSeconds] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (duration: number) => {
    addTimer(duration)
    setOpen(false)
    setCustomMinutes('')
    setCustomSeconds('')
    setError('')
  }

  const handleCustom = () => {
    const mins = Number.parseInt(customMinutes) || 0
    const secs = Number.parseInt(customSeconds) || 0
    const total = mins * 60 + secs
    if (total <= 0) {
      setError('Enter a time greater than 0')
      return
    }
    handleAdd(total)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) {
          setCustomMinutes('')
          setCustomSeconds('')
          setError('')
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg shadow-emerald-500/20">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 sm:w-96">
        <DialogHeader>
          <DialogTitle>New Timer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-slate-400">Quick presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <Button
                  key={p.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAdd(p.value)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="mb-2 text-sm text-slate-400">Custom time</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                placeholder="min"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-20 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-center text-sm tabular-nums text-slate-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-slate-500">:</span>
              <input
                type="number"
                min="0"
                max="59"
                placeholder="sec"
                value={customSeconds}
                onChange={(e) => setCustomSeconds(e.target.value)}
                className="w-20 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-center text-sm tabular-nums text-slate-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <Button size="sm" onClick={handleCustom}>
                Add
              </Button>
            </div>
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
