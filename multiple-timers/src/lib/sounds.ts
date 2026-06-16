let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new AudioContext()
    } catch {
      return null
    }
  }
  return audioContext
}

export function playBeep() {
  const ctx = getContext()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = 880
  osc.type = 'sine'
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.3)
}
