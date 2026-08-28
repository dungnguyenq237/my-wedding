import { Check, Heart, X } from 'lucide-react'
import { useState } from 'react'

type RSVPResponse = 'idle' | 'attending' | 'unableToAttend'
type WeddingAudience = 'bride' | 'groom'

interface RSVPProps {
  audience: WeddingAudience
}

export function RSVP({ audience }: RSVPProps) {
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
          <p>Chúng mình rất mong sẽ được gặp bạn ở đó.</p>
        </div>
      )}
      {response === 'unableToAttend' && (
        <div className="rsvp__outcome rsvp__outcome--no" role="status">
          <img
            className="rsvp__qr"
            src={audience === 'bride' ? '/my-wedding/bride-qr.png' : '/my-wedding/wedding-qr.png'}
            alt={audience === 'bride' ? 'QR mừng cưới TPBank' : 'QR mừng cưới Techcombank'}
          />
          <p>Hãy gửi cho chúng tớ những lời chúc tốt đẹp nếu bạn không thể có mặt.</p>
        </div>
      )}
    </section>
  )
}
