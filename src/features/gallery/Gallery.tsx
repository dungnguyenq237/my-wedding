import type { GalleryImage } from '../../content/wedding'

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  return (
    <div className="gallery" aria-label="Khoảnh khắc của chúng mình">
      {images.map((image, index) => (
        <figure className={`gallery__item gallery__item--${index + 1}`} key={image.src}>
          <img alt={image.alt} loading="lazy" src={image.src} style={{ objectPosition: image.position }} />
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
