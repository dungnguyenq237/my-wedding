import { weddingConfig } from "../../config/wedding";

export const ReceptionPage = () => (
  <section className="single-page reception-page" aria-labelledby="reception-title">
    <p className="eyebrow">PLEASE JOIN US FOR THE</p>
    <h2 id="reception-title">Wedding Reception</h2>
    <p className="event-time">{weddingConfig.reception.time}</p>
    <p className="reception-program">Dinner <span>·</span> Drinks <span>·</span> Dancing</p>
    <address>
      <strong>{weddingConfig.reception.venue}</strong>
      {weddingConfig.reception.location}
    </address>
    <a
      className="reception-location"
      href={weddingConfig.reception.mapUrl}
      target="_blank"
      rel="noreferrer"
    >
      View Reception Location <span aria-hidden="true">↗</span>
    </a>
    <div className="dress-code">
      <p className="eyebrow">DRESS CODE</p>
      <div className="swatches" aria-hidden="true">
        <i className="swatch-beige" />
        <i className="swatch-cream" />
        <i className="swatch-earth" />
      </div>
      <p>{weddingConfig.reception.dressCode.join(" · ")}</p>
    </div>
  </section>
);
