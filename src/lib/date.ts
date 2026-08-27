export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

export function getCountdownParts(targetIso: string, now: number): CountdownParts {
  const difference = Math.max(0, new Date(targetIso).getTime() - now)
  const totalSeconds = Math.floor(difference / 1000)

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isComplete: difference === 0,
  }
}

export function formatVietnameseDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
