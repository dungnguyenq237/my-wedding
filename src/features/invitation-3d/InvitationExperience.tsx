import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import type { InvitationContent, WeddingEvent } from '../../content/wedding'
import { InvitationFallback } from './InvitationFallback'
import { useWebGLSupport } from './useWebGLSupport'

const InvitationScene = lazy(() => import('./InvitationScene'))

interface InvitationExperienceProps {
  invitation: InvitationContent
  events: WeddingEvent[]
}

interface SceneBoundaryProps {
  children: ReactNode
  onError: () => void
}

interface SceneBoundaryState {
  hasError: boolean
}

class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

export function InvitationExperience({ invitation, events }: InvitationExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const webglSupport = useWebGLSupport()
  const reducedMotion = useReducedMotion()
  const [shouldLoadScene, setShouldLoadScene] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
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

  const canRenderScene = webglSupport && shouldLoadScene && !sceneFailed && !reducedMotion

  return (
    <div className="invitation" ref={sectionRef}>
      <div className="invitation__stage" aria-label="Thiệp mời cưới tương tác">
        {canRenderScene ? (
          <SceneBoundary onError={() => setSceneFailed(true)}>
            <Suspense fallback={<InvitationFallback invitation={invitation} events={events} />}>
              <InvitationScene isOpen={isOpen} />
            </Suspense>
          </SceneBoundary>
        ) : (
          <InvitationFallback invitation={invitation} events={events} />
        )}
        {canRenderScene && (
          <button className="button button--dark invitation__control" onClick={() => setIsOpen((open) => !open)} type="button">
            {isOpen ? 'Đóng thiệp' : 'Mở thiệp'}
          </button>
        )}
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
