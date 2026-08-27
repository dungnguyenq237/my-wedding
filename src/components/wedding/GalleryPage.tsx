import { useState } from "react";

import { coupleInitials, weddingConfig } from "../../config/wedding";

const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="gallery-placeholder" aria-label={`Photo ${index + 1} placeholder`}>
        <span aria-hidden="true">{coupleInitials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${weddingConfig.couple.bride.name} and ${weddingConfig.couple.groom.name}, memory ${index + 1}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
};

export const GalleryPage = () => (
  <section className="single-page gallery-page" aria-labelledby="gallery-title">
    <p className="eyebrow">FRAGMENTS OF FOREVER</p>
    <h2 id="gallery-title">Our Gallery</h2>
    <div className="gallery-grid">
      {weddingConfig.gallery.map((src, index) => (
        <GalleryImage key={src} src={src} index={index} />
      ))}
    </div>
  </section>
);
