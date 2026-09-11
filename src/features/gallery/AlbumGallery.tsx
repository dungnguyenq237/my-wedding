import { BookOpen, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import type { GalleryImage } from '../../content/wedding'
import { AlbumPages } from './AlbumPages'
import { bookPageCount, navigationTarget, photoPageIndex, visiblePhotoIndexes } from './book-model'
import { useAlbumBook } from './useAlbumBook'
import './album.css'

export function AlbumGallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return null
  // Reset the book when content changes; templates remain immutable during a flip.
  return <WeddingBook key={JSON.stringify(images)} images={images} />
}

function WeddingBook({ images }: { images: GalleryImage[] }) {
  const templates = useRef<HTMLDivElement>(null)
  const gesture = useRef<{ x: number; y: number } | null>(null)
  const book = useAlbumBook(templates, JSON.stringify(images))
  const total = bookPageCount(images.length)
  const visible = visiblePhotoIndexes(book.page, images.length, book.orientation)
  const front = book.page === 0
  const back = book.page === total - 1
  const status = front
    ? 'Bìa album'
    : back
      ? 'Mãi là chúng mình'
      : visible.length
        ? `Khoảnh khắc ${visible.map((index) => index + 1).join(' – ')} / ${images.length}`
        : 'Một lời hẹn trọn đời'
  const turn = (direction: 1 | -1) =>
    book.goTo(navigationTarget(book.page, direction, total, book.orientation))
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      turn(event.key === 'ArrowRight' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      book.goTo(event.key === 'Home' ? 0 : total - 1)
    }
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current
    gesture.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) turn(dx < 0 ? 1 : -1)
    else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const rect = event.currentTarget.getBoundingClientRect()
      if (front) turn(1)
      else if (back) turn(-1)
      else turn(event.clientX < rect.left + rect.width / 2 ? -1 : 1)
    }
  }

  return (
    <div
      className="wedding-album"
      role="region"
      aria-label="Album ảnh kỷ niệm"
      onKeyDown={onKeyDown}
    >
      <div className="wedding-album__intro">
        <span /> <p>the wedding collection</p> <span />
      </div>
      <div
        hidden={book.failed}
        className={`wedding-album__scene is-${book.orientation} ${front ? 'is-front' : back ? 'is-back' : 'is-open'}`}
      >
        <div className="wedding-album__halo" aria-hidden="true" />
        <div
          className="wedding-album__book"
          role="group"
          aria-label="Sách ảnh, dùng phím mũi tên để lật trang"
          tabIndex={0}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return
            gesture.current = { x: event.clientX, y: event.clientY }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            gesture.current = null
          }}
          onLostPointerCapture={() => {
            gesture.current = null
          }}
        >
          <div ref={book.mount} className="wedding-album__mount" aria-hidden="true" />
        </div>
        {!book.ready && !book.failed && (
          <p className="wedding-album__loading" role="status">
            Đang mở những kỷ niệm…
          </p>
        )}
      </div>
      <div ref={templates} hidden aria-hidden="true">
        <AlbumPages images={images} />
      </div>
      {book.failed ? (
        <div className="wedding-album__fallback">
          <p>Album ảnh của chúng mình</p>
          {images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <>
          <p className="wedding-album__hint">
            {front ? 'Chạm để mở một chút yêu thương' : 'Vuốt ngang hoặc dùng mũi tên để lật trang'}
          </p>
          <div className="wedding-album__controls">
            <button
              type="button"
              aria-label="Lật trang trước"
              disabled={!book.ready || book.busy || front}
              onClick={() => turn(-1)}
            >
              <ChevronLeft size={20} />
            </button>
            <div aria-live="polite" aria-atomic="true">
              <span>{status}</span>
              <small>{front ? 'D + T · OUR FOREVER' : 'những ngày rất thương'}</small>
            </div>
            <button
              type="button"
              aria-label="Lật trang tiếp theo"
              disabled={!book.ready || book.busy || back}
              onClick={() => turn(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          {(front || back) && (
            <button
              type="button"
              className="wedding-album__open"
              disabled={!book.ready || book.busy}
              onClick={() => book.goTo(1)}
            >
              {front ? <BookOpen size={16} /> : <RotateCcw size={16} />}
              {front ? 'Mở album' : 'Xem lại album'}
            </button>
          )}
          <div className="wedding-album__thumbnails" aria-label="Chọn ảnh trong album">
            {images.map((image, index) => (
              <button
                type="button"
                key={image.src}
                disabled={!book.ready || book.busy}
                aria-current={visible.includes(index) ? 'true' : undefined}
                aria-label={`Xem ảnh ${index + 1}: ${image.caption}`}
                onClick={() => book.goTo(photoPageIndex(index))}
              >
                <img src={image.src} alt="" loading="lazy" draggable={false} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <p className="wedding-album__description">
            {visible.map((index) => `${images[index].alt}: ${images[index].caption}`).join('. ')}
          </p>
        </>
      )}
    </div>
  )
}
