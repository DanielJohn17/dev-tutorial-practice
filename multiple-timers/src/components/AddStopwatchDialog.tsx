import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStopwatchStore } from '@/stores/stopwatchStore'

export function AddStopwatchButton() {
  const addStopwatch = useStopwatchStore((s) => s.addStopwatch)

  return (
    <Button
      onClick={() => addStopwatch()}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg shadow-cyan-500/20"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
