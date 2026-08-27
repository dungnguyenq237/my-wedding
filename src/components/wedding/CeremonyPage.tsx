import { weddingConfig } from "../../config/wedding";

export const CeremonyPage = () => (
  <section className="single-page event-page" aria-labelledby="ceremony-title">
    <p className="eyebrow">TOGETHER WITH THEIR FAMILIES</p>
    <h2 id="ceremony-title">Wedding Ceremony</h2>
    <time className="date-lockup" dateTime={weddingConfig.date}>
      <span>{weddingConfig.dateDetails.weekday}</span>
      <strong>{weddingConfig.dateDetails.day}</strong>
      <span>
        {weddingConfig.dateDetails.month} · {weddingConfig.dateDetails.year}
      </span>
    </time>
    <p className="event-time">{weddingConfig.ceremony.time}</p>
    <address>
      <strong>{weddingConfig.ceremony.venue}</strong>
      {weddingConfig.ceremony.location}
    </address>
    <a href={weddingConfig.ceremony.mapUrl} target="_blank" rel="noreferrer">
      View Location <span aria-hidden="true">↗</span>
    </a>
  </section>
);
