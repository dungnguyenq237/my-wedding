import { Check, Heart, QrCode, X } from 'lucide-react'
import { useState } from 'react'

type RSVPResponse = 'idle' | 'attending' | 'unableToAttend'

export function RSVP() {
  const [response, setResponse] = useState<RSVPResponse>('idle')

  return (
    <section className="rsvp section" id="rsvp" aria-labelledby="rsvp-title">
      <p className="eyebrow">lời hẹn gặp</p>
      <h2 id="rsvp-title">Bạn có thể đến chung vui<br />cùng chúng mình không?</h2>
      <div className="rsvp__choices" aria-label="Lựa chọn xác nhận tham dự">
        <button className={response === 'attending' ? 'is-selected' : ''} onClick={() => setResponse('attending')} type="button">
          <Check size={18} /> Có, chúng mình sẽ đến
        </button>
        <button className={response === 'unableToAttend' ? 'is-selected' : ''} onClick={() => setResponse('unableToAttend')} type="button">
          <X size={18} /> Không thể đến được
        </button>
      </div>
      {response === 'attending' && (
        <div className="rsvp__outcome rsvp__outcome--yes" role="status">
          <Heart fill="currentColor" size={26} />
          <p>We're hoping to see you there.</p>
        </div>
      )}
      {response === 'unableToAttend' && (
        <div className="rsvp__outcome rsvp__outcome--no" role="status">
          <div className="qr-placeholder" aria-label="QR mừng cưới sẽ được cập nhật"><QrCode size={54} /></div>
          <p>Sending us some nice words if you cannot be there.</p>
          <small>QR mừng cưới sẽ được cập nhật</small>
        </div>
      )}
    </section>
  )
}
