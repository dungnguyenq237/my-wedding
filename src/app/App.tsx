import { ArrowDown, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { wedding } from '../content/wedding'
import { Countdown } from '../features/countdown/Countdown'
import { Gallery } from '../features/gallery/Gallery'
import { InvitationExperience } from '../features/invitation-3d/InvitationExperience'
import { RSVP } from '../features/rsvp/RSVP'

export default function App() {
  const scrollFromHero = () => {
    const destination = window.innerWidth >= 768 ? 'thiep-moi' : 'su-kien'
    document.getElementById(destination)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__sun" />
        <div className="hero__copy">
          <Reveal>
            <p className="eyebrow"><Sparkles size={14} /> save the date</p>
            <h1 id="hero-title"><span>{wedding.couple.bride}</span><i>&</i><span>{wedding.couple.groom}</span></h1>
            <p className="hero__date">{wedding.dateLabel} · 18:00</p>
            <div className="hero__countdown">
              <p>Còn lại để cùng chung vui</p>
              <Countdown targetIso={wedding.countdownTarget} />
            </div>
            <button className="button button--dark hero__cta" onClick={scrollFromHero} type="button">
              Mở lời mời <ArrowDown size={17} />
            </button>
          </Reveal>
        </div>
        <Reveal>
          <figure className="hero__image">
            <img alt={wedding.heroImage.alt} fetchPriority="high" src={wedding.heroImage.src} />
            <figcaption>{wedding.heroImage.caption}</figcaption>
          </figure>
        </Reveal>
        <div className="hero__signature">{wedding.couple.initials}</div>
      </section>

      <section className="story section" id="cau-chuyen" aria-labelledby="story-title">
        <div className="story__lead">
          <SectionHeading eyebrow="chuyện chúng mình" title="Bắt đầu từ một cuộc trò chuyện rất dài." />
          <p className="story__intro">Một chút tình yêu, một chút ngẫu nhiên và rất nhiều khoảnh khắc tụi mình muốn cất giữ cùng nhau.</p>
        </div>
        <div className="story__layout">
          <figure className="story__image story__image--tall">
            <img alt={wedding.gallery[0].alt} loading="lazy" src={wedding.gallery[0].src} />
          </figure>
          <div className="story__timeline">
            {wedding.story.map((beat) => (
              <Reveal key={beat.year}>
                <article className="story__beat">
                  <span>{beat.year}</span>
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section section" aria-labelledby="gallery-title">
        <SectionHeading align="center" eyebrow="những thước phim nhỏ" title="Vài điều bình dị, nhưng là của chúng mình." />
        <Gallery images={wedding.gallery} />
      </section>

      <section className="events section" id="su-kien" aria-labelledby="events-title">
        <div className="events__heading">
          <SectionHeading eyebrow="ngày chung đôi" title="Hẹn bạn vào một ngày thật đẹp." />
          <p>Lưu lại lịch để mình cùng nâng ly, kể chuyện và nhảy đến thật khuya nhé.</p>
        </div>
        <div className="events__list">
          {wedding.events.map((event, index) => (
            <Reveal key={event.id}>
              <article className={`event-card event-card--${index + 1}`}>
                <p className="event-card__label">{event.label}</p>
                <h3>{event.title}</h3>
                <dl>
                  <div><dt><CalendarDays size={16} /> Thời gian</dt><dd>{event.dateLabel}<br />{event.time}</dd></div>
                  <div><dt><MapPin size={16} /> Địa điểm</dt><dd>{event.venue}<br />{event.address}</dd></div>
                </dl>
                <a href={event.mapUrl} rel="noreferrer" target="_blank">Xem bản đồ <ArrowDown size={15} /></a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="invitation-section section" id="thiep-moi" aria-labelledby="invitation-title">
        <SectionHeading align="center" eyebrow="thiệp mời" title="Một chiếc thiệp, mở ra một lời hẹn." />
        <InvitationExperience invitation={wedding.invitation} events={wedding.events} />
      </section>

      <RSVP />

      <footer className="footer">
        <span>{wedding.couple.initials}</span>
        <p>Hẹn gặp bạn vào ngày 24 tháng 10 năm 2026</p>
      </footer>
    </main>
  )
}
