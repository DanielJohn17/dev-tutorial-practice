import { useCallback, useRef } from 'react'
import { playBeep } from '@/lib/sounds'

export function useNotification() {
  const permissionRef = useRef<NotificationPermission | null>(null)

  const notify = useCallback((title: string, body?: string) => {
    playBeep()

    if (!('Notification' in window)) return

    if (permissionRef.current === null) {
      Notification.requestPermission().then((p) => {
        permissionRef.current = p
        if (p === 'granted') {
          new Notification(title, { body })
        }
      })
    } else if (permissionRef.current === 'granted') {
      new Notification(title, { body })
    }
  }, [])

  return { notify }
}
