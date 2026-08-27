import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { GalleryImage } from '../../content/wedding'

interface AlbumGalleryProps {
  images: GalleryImage[]
}

export function AlbumGallery({ images }: AlbumGalleryProps) {
  const pageRef = useRef<HTMLElement>(null)
  const swipeStartX = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const activeImage = images[activeIndex]

  const selectImage = useCallback((nextIndex: number, nextDirection: 1 | -1) => {
    setDirection(nextDirection)
    setActiveIndex((nextIndex + images.length) % images.length)
  }, [images.length])

  const showPrevious = useCallback(() => {
    selectImage(activeIndex - 1, -1)
  }, [activeIndex, selectImage])

  const showNext = useCallback(() => {
    selectImage(activeIndex + 1, 1)
  }, [activeIndex, selectImage])

  useLayoutEffect(() => {
    if (!pageRef.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { autoAlpha: 0, rotation: direction * 2.4, xPercent: direction * 18 },
        { autoAlpha: 1, duration: 0.58, ease: 'power3.out', rotation: 0, xPercent: 0 },
      )
    })

    return () => context.revert()
  }, [activeIndex, direction])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    swipeStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (swipeStartX.current === null) return

    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null

    if (Math.abs(distance) < 42) return
    if (distance > 0) showPrevious()
    else showNext()
  }

  if (images.length === 0) return null

  return (
    <div
      className="album"
      aria-label="Album ảnh kỷ niệm"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="album__bar">
        <span>our little album</span>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
      </div>

      <div className="album__stage" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <div className="album__back-page album__back-page--one" aria-hidden="true" />
        <div className="album__back-page album__back-page--two" aria-hidden="true" />
        <figure className="album__page" ref={pageRef}>
          <div className="album__image-frame">
            <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="lazy" style={{ objectPosition: activeImage.position }} />
          </div>
          <figcaption>
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <p>{activeImage.caption}</p>
            <i>❁</i>
          </figcaption>
        </figure>
      </div>

      <div className="album__controls">
        <button aria-label="Xem ảnh trước" onClick={showPrevious} type="button"><ChevronLeft size={18} /></button>
        <span aria-live="polite">Khoảnh khắc {activeIndex + 1}</span>
        <button aria-label="Xem ảnh tiếp theo" onClick={showNext} type="button"><ChevronRight size={18} /></button>
      </div>

      <div className="album__thumbnails" aria-label="Chọn ảnh trong album">
        {images.map((image, index) => (
          <button
            aria-current={index === activeIndex ? 'true' : undefined}
            aria-label={`Xem ảnh ${index + 1}: ${image.caption}`}
            className={index === activeIndex ? 'is-active' : ''}
            key={image.src}
            onClick={() => selectImage(index, index >= activeIndex ? 1 : -1)}
            type="button"
          >
            <img src={image.src} alt="" loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
