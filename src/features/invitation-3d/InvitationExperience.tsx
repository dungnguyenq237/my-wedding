import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { InvitationContent, WeddingEvent } from '../../content/wedding'

const InvitationScene = lazy(() => import('./InvitationScene'))

interface InvitationExperienceProps {
  invitation: InvitationContent
  events: WeddingEvent[]
}

export function InvitationExperience({ invitation, events }: InvitationExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [shouldLoadScene, setShouldLoadScene] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const reception = events.find((event) => event.id === 'tiec-cuoi')

  useEffect(() => {
    const node = sectionRef.current
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoadScene(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadScene(true)
        observer.disconnect()
      }
    }, { rootMargin: '240px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="invitation" ref={sectionRef}>
      <div className="invitation__stage" aria-label="Thiệp mời cưới tương tác">
        {shouldLoadScene && (
          <Suspense fallback={null}>
            <InvitationScene isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
          </Suspense>
        )}
        <button className="button button--dark invitation__control" onClick={() => setIsOpen((open) => !open)} type="button">
          {isOpen ? 'Thu gọn thiệp' : 'Khám phá thiệp'}
        </button>
      </div>
      <article className="invitation__details">
        <p>{invitation.greeting}</p>
        <h3>{invitation.title}</h3>
        <div className="invitation__families">
          {invitation.parents.map((family) => <span key={family}>{family}</span>)}
        </div>
        <strong>Ngọc An <i>&</i> Minh Khang</strong>
        <time dateTime="2026-10-24T18:00:00+07:00">{reception?.dateLabel} · {reception?.time}</time>
        <span>{reception?.venue}</span>
        <small>{invitation.request}</small>
      </article>
    </div>
  )
}
