import { useCountdown } from './useCountdown'

interface CountdownProps {
  targetIso: string
}

const labels = [
  ['days', 'Ngày'],
  ['hours', 'Giờ'],
  ['minutes', 'Phút'],
  ['seconds', 'Giây'],
] as const

export function Countdown({ targetIso }: CountdownProps) {
  const parts = useCountdown(targetIso)

  if (parts.isComplete) {
    return <p className="countdown-complete">Hôm nay là ngày chung đôi!</p>
  }

  return (
    <div className="countdown" aria-label="Thời gian đếm ngược đến tiệc cưới">
      {labels.map(([key, label]) => (
        <div className="countdown__unit" key={key}>
          <strong>{String(parts[key]).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
