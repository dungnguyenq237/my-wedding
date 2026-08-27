import { useState } from 'react'
import type { InvitationContent, WeddingEvent } from '../../content/wedding'

interface InvitationFallbackProps {
  invitation: InvitationContent
  events: WeddingEvent[]
}

export function InvitationFallback({ invitation, events }: InvitationFallbackProps) {
  const [isOpen, setIsOpen] = useState(false)
  const reception = events.find((event) => event.id === 'tiec-cuoi')

  return (
    <div className={`invitation-fallback ${isOpen ? 'invitation-fallback--open' : ''}`}>
      <div className="invitation-fallback__envelope" aria-hidden="true">
        <span>{isOpen ? 'A + K' : 'Mở lời mời'}</span>
      </div>
      <div className="invitation-fallback__card">
        <p>{invitation.greeting}</p>
        <h3>{invitation.title}</h3>
        <strong>Ngọc An <i>&</i> Minh Khang</strong>
        <span>{reception?.dateLabel} · {reception?.time}</span>
        <small>{invitation.request}</small>
      </div>
      <button className="button button--dark" onClick={() => setIsOpen((open) => !open)} type="button">
        {isOpen ? 'Đóng thiệp' : 'Mở thiệp'}
      </button>
    </div>
  )
}
