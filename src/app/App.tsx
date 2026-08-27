import { CalendarDays, ChevronDown, MapPin, Navigation } from 'lucide-react'
import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'
import { wedding } from '../content/wedding'
import { Countdown } from '../features/countdown/Countdown'
import { RSVP } from '../features/rsvp/RSVP'

const navigation = [
  ['Mở đầu', '#hero'],
  ['Chuyện mình', '#cau-chuyen'],
  ['Ngày cưới', '#su-kien'],
  ['Gia đình', '#gia-dinh'],
  ['Địa điểm', '#dia-diem'],
  ['RSVP', '#rsvp'],
] as const

export default function App() {
  const root = useRef<HTMLElement>(null)
  const [isReady, setIsReady] = useState(false)
  const reception = wedding.events.find((event) => event.id === 'tiec-cuoi')!

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timer = window.setTimeout(() => {
        setIsReady(true)
        gsap.fromTo('.hero__photo', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'power3.out' })
        gsap.fromTo('.hero__poster > *', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.09, delay: 0.35, ease: 'power3.out' })
      }, 720)

      return () => window.clearTimeout(timer)
    }, root)

    return () => context.revert()
  }, [])

  return (
    <main ref={root}>
      <div className={`preloader ${isReady ? 'preloader--hidden' : ''}`} aria-hidden={isReady}><span>{wedding.couple.initials}</span></div>

      <nav className="site-nav" aria-label="Điều hướng trang">
        <a className="site-nav__monogram" href="#hero">{wedding.couple.initials}</a>
        <div className="site-nav__links">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
      </nav>

      <section className="cinematic-hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__ornament" aria-hidden="true" />
        <div className="hero__mosaic" aria-hidden="true">
          {[wedding.gallery[0], wedding.gallery[1], wedding.heroImage, wedding.gallery[2], wedding.gallery[3]].map((image, index) => <img className={`hero__photo hero__photo--${index + 1}`} key={image.src} src={image.src} alt="" />)}
        </div>
        <article className="hero__poster">
          <p>Trân trọng kính mời</p>
          <span className="hero__blessing">Ngày chung đôi</span>
          <h1 id="hero-title">{wedding.couple.bride}</h1>
          <i>&</i>
          <h1>{wedding.couple.groom}</h1>
          <span className="hero__family-line">Cùng sự chúc phúc của hai bên gia đình</span>
          <time dateTime="2026-10-24T18:00:00+07:00">Thứ Bảy · 24 tháng 10, 2026</time>
          <a className="hero__invitation-link" href="#cau-chuyen">Mở lời mời <ChevronDown size={16} /></a>
          <div className="hero__countdown"><Countdown targetIso={wedding.countdownTarget} /></div>
        </article>
      </section>

      <section className="story-reference section" id="cau-chuyen" aria-labelledby="story-title">
        <p className="ornate-label">˚ chuyện chúng mình ˚</p>
        <h2 id="story-title">Hai gia đình, một lời hẹn.</h2>
        <p className="story-reference__intro">Với tình thương của gia đình và những người thân yêu, tụi mình trân trọng mời bạn đến chứng kiến ngày hai hành trình trở thành một.</p>
        <div className="story-reference__beats">{wedding.story.map((beat) => <article key={beat.year}><span>{beat.year}</span><h3>{beat.title}</h3><p>{beat.body}</p></article>)}</div>
      </section>

      <section className="celebration section" id="su-kien" aria-labelledby="event-title">
        <p className="ornate-label">˚ ngày vui của chúng mình ˚</p>
        <h2 id="event-title">Lịch trình chung vui</h2>
        <div className="celebration__timeline">
          {wedding.events.map((event, index) => <article className="timeline-card" key={event.id}>
            <span className="timeline-card__number">0{index + 1}</span><div><p>{event.label}</p><h3>{event.title}</h3></div>
            <dl><div><dt><CalendarDays size={15} /> Thời gian</dt><dd>{event.dateLabel} · {event.time}</dd></div><div><dt><MapPin size={15} /> Địa điểm</dt><dd>{event.venue}<br />{event.address}</dd></div></dl>
          </article>)}
        </div>
      </section>

      <section className="families section" id="gia-dinh" aria-labelledby="family-title">
        <p className="ornate-label">˚ gia đình ˚</p><h2 id="family-title">Với sự chúc phúc của</h2>
        <div className="families__grid"><article><span>Nhà trai</span><h3>{wedding.couple.groom}</h3><p>Con trai của</p><strong>{wedding.invitation.parents[1]}</strong></article><div className="families__symbol" aria-hidden="true">❁</div><article><span>Nhà gái</span><h3>{wedding.couple.bride}</h3><p>Con gái của</p><strong>{wedding.invitation.parents[0]}</strong></article></div>
      </section>

      <section className="moments section" aria-labelledby="moments-title">
        <p className="ornate-label">˚ những khoảnh khắc ˚</p><h2 id="moments-title">Những ngày rất thương</h2>
        <div className="moments__grid">{wedding.gallery.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}</div>
      </section>

      <section className="venue section" id="dia-diem" aria-labelledby="venue-title">
        <p className="ornate-label">˚ địa điểm ˚</p><h2 id="venue-title">Hẹn gặp bạn ở đây nhé</h2><p>{reception.venue}<br />{reception.address}</p><a href={reception.mapUrl} target="_blank" rel="noreferrer"><Navigation size={17} /> Mở Google Maps</a>
      </section>

      <RSVP />

      <footer className="cinematic-footer"><span>❁ · {wedding.couple.initials} · ❁</span><p>{wedding.dateLabel} · Thành phố Hồ Chí Minh</p><small>Thiệp cưới được gửi với thật nhiều yêu thương</small></footer>
    </main>
  )
}
