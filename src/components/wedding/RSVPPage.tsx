import type { RSVPRepository } from "../../repositories/rsvp";
import { RSVPForm } from "../ui/RSVPForm";

export const RSVPPage = ({ repository }: { repository: RSVPRepository }) => (
  <section className="single-page rsvp-page" aria-labelledby="rsvp-title">
    <div className="rsvp-intro">
      <p className="eyebrow">KINDLY REPLY</p>
      <h2 id="rsvp-title">Will You Join Us?</h2>
      <p>Your presence would make our celebration complete.</p>
    </div>
    <RSVPForm repository={repository} />
  </section>
);

