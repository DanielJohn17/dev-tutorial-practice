import { useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/Header'
import { TimerList } from '@/components/TimerList'
import { StopwatchList } from '@/components/StopwatchList'
import { AddTimerDialog } from '@/components/AddTimerDialog'
import { AddStopwatchButton } from '@/components/AddStopwatchDialog'
import { EmptyState } from '@/components/EmptyState'
import { useTimerStore } from '@/stores/timerStore'
import { useStopwatchStore } from '@/stores/stopwatchStore'
import { useNotification } from '@/hooks/useNotification'
import { useTheme } from '@/hooks/useTheme'
import { toast } from 'sonner'

export default function App() {
  const { theme, setTheme } = useTheme()
  const timerTick = useTimerStore((s) => s.tick)
  const stopwatchTick = useStopwatchStore((s) => s.tick)
  const timers = useTimerStore((s) => s.timers)
  const stopwatches = useStopwatchStore((s) => s.stopwatches)
  const { notify } = useNotification()
  const completedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const timer = setInterval(() => {
      const completedId = timerTick()
      const latest = useTimerStore.getState().timers

      for (const id of completedRef.current) {
        const t = latest[id]
        if (!t || t.status !== 'completed') {
          completedRef.current.delete(id)
        }
      }

      if (completedId && !completedRef.current.has(completedId)) {
        completedRef.current.add(completedId)
        const label = latest[completedId]?.label ?? 'Timer'
        notify(`${label} is done!`, 'Your countdown timer has finished.')
        toast(`${label} done!`, {
          icon: '⏰',
          style: { background: '#1e293b', color: '#fbbf24', border: '1px solid #fbbf24' },
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timerTick, notify])

  useEffect(() => {
    const sw = setInterval(() => {
      stopwatchTick()
    }, 50)

    return () => clearInterval(sw)
  }, [stopwatchTick])

  return (
    <div className="mx-auto min-h-dvh max-w-5xl px-4 pb-24">
      <Header theme={theme} setTheme={setTheme} />

      <Tabs defaultValue="stopwatch" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="stopwatch">Stopwatches</TabsTrigger>
          <TabsTrigger value="timer">Timers</TabsTrigger>
        </TabsList>

        <TabsContent value="stopwatch" className="mt-0">
          {Object.keys(stopwatches).length > 0 ? (
            <StopwatchList />
          ) : (
            <EmptyState type="stopwatch" />
          )}
          <AddStopwatchButton />
        </TabsContent>

        <TabsContent value="timer" className="mt-0">
          {Object.keys(timers).length > 0 ? <TimerList /> : <EmptyState type="timer" />}
          <AddTimerDialog />
        </TabsContent>
      </Tabs>

      <Toaster position="top-center" theme={theme === 'system' ? undefined : theme} />
      <Analytics />
    </div>
  )
}
