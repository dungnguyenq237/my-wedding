import type { GalleryImage } from '../../content/wedding'
import { wedding } from '../../content/wedding'
import { Botanical, Flourish } from './AlbumOrnaments'

const notes = [
  'Thương từ những điều nhỏ nhất.',
  'Chỉ cần bên nhau, đâu cũng là nhà.',
  'Gom nắng, gom cười, gom cả yêu thương.',
  'Viết tiếp câu chuyện của hai chúng mình.',
]

function Cover({ closing = false }: { closing?: boolean }) {
  return (
    <article
      className={`book-page book-page--cover ${closing ? 'book-page--closing' : ''}`}
      data-density="hard"
    >
      <div className="scrap-cover__linen" />
      <Botanical className="scrap-botanical scrap-botanical--top" />
      <Botanical className="scrap-botanical scrap-botanical--bottom" />
      <div className="scrap-cover__label">
        <p className="book-eyebrow">a little book of love</p>
        <span className="scrap-cover__monogram">
          D <i>&</i> T
        </span>
        <Flourish className="book-flourish" />
        <h3>
          {closing ? (
            <>
              Thương nhau
              <br />
              <em>mãi nhé.</em>
            </>
          ) : (
            <>
              Chuyện
              <br />
              <em>chúng mình</em>
            </>
          )}
        </h3>
        <p className="scrap-cover__names">
          {wedding.couple.groom}
          <span>&</span>
          {wedding.couple.bride}
        </p>
        <p className="scrap-cover__year">EST. 2026</p>
      </div>
      <div className="scrap-cover__ribbon" aria-hidden="true" />
      <div className="scrap-cover__seal" aria-hidden="true">
        <span>♡</span>
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
          <Botanical className="scrap-page__botanical" />
          <div className="scrap-page__heading">
            <span>dear diary,</span>
            <span>những ngày bên nhau</span>
          </div>
          <div className="scrap-page__body">
            <figure className="scrap-photo">
              <span className="scrap-photo__tape scrap-photo__tape--left" aria-hidden="true" />
              <span className="scrap-photo__tape scrap-photo__tape--right" aria-hidden="true" />
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                style={{ objectPosition: image.position }}
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
            <div className="scrap-note">
              <span aria-hidden="true">♡</span>
              <p>{notes[index % notes.length]}</p>
            </div>
          </div>
          <div className="scrap-page__footer">
            <Flourish className="book-flourish" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        </article>
      ))}
      {images.length % 2 !== 0 && (
        <article className="book-page book-page--dedication" data-density="soft">
          <Botanical className="scrap-dedication__flower" />
          <p>
            Đi đâu cũng được,
            <br />
            <em>miễn là cùng nhau.</em>
          </p>
        </article>
      )}
      <Cover closing />
    </>
  )
}
