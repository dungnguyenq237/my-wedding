import { useEffect, useState } from 'react'
import { getCountdownParts } from '../../lib/date'

export function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return getCountdownParts(targetIso, now)
}
