import type { GalleryImage } from '../../content/wedding'
import { wedding } from '../../content/wedding'
import { Corner, Flourish } from './AlbumOrnaments'

const verses = [
  'Có nhau, những ngày bình thường cũng hóa dịu dàng.',
  'Một ánh nhìn, một nụ cười, một đời thương nhớ.',
  'Mình cùng giữ lại những điều thật đẹp.',
  'Từ hôm nay, và thật nhiều ngày sau nữa.',
]

function Cover({ closing = false }: { closing?: boolean }) {
  return (
    <article
      className={`book-page book-page--cover ${closing ? 'book-page--closing' : ''}`}
      data-density="hard"
    >
      <div className="book-cover__border" />
      {['tl', 'tr', 'bl', 'br'].map((corner) => (
        <Corner key={corner} className={`book-corner book-corner--${corner}`} />
      ))}
      <div className="book-cover__ribbon" aria-hidden="true" />
      <div className="book-cover__content">
        <p className="book-eyebrow">{closing ? 'happily ever after' : 'the wedding album'}</p>
        <div className="book-cover__crest">
          <span>D</span>
          <i>&</i>
          <span>T</span>
        </div>
        <Flourish className="book-flourish" />
        {closing ? (
          <h3>
            Mãi là
            <br />
            <em>chúng mình</em>
          </h3>
        ) : (
          <h3>
            {wedding.couple.groom}
            <i>&</i>
            {wedding.couple.bride}
          </h3>
        )}
        <p className="book-cover__subtitle">
          {closing
            ? 'Cảm ơn vì đã cùng chúng mình lưu giữ yêu thương.'
            : 'Một lời hẹn · Một đời thương'}
        </p>
        <Flourish className="book-flourish book-flourish--small" />
        <p className="book-cover__date">OCTOBER · 2026</p>
      </div>
    </article>
  )
}

export function AlbumPages({ images }: { images: GalleryImage[] }) {
  return (
    <>
      <Cover />
      {images.map((image, index) => (
        <article
          className={`book-page book-page--photo book-page--photo-${index + 1}`}
          key={image.src}
          data-density="soft"
        >
          <div className="book-photo__top">
            <span>
              {wedding.couple.groom} & {wedding.couple.bride}
            </span>
            <span>❦</span>
          </div>
          <div className="book-photo__body">
            <Flourish className="book-flourish book-photo__ornament" />
            <figure className="book-photo__mount">
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                style={{ objectPosition: image.position }}
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
            <p className="book-photo__verse">{verses[index % verses.length]}</p>
            <Flourish className="book-flourish book-flourish--small" />
          </div>
          <div className="book-photo__footer">
            <span>OUR FOREVER</span>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        </article>
      ))}
      {images.length % 2 !== 0 && (
        <article className="book-page book-page--dedication" data-density="soft">
          <Flourish className="book-flourish" />
          <p>
            Một lời hẹn
            <br />
            <em>trọn đời.</em>
          </p>
        </article>
      )}
      <Cover closing />
    </>
  )
}
