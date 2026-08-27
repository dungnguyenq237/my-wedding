import type { RSVPRepository } from "../../repositories/rsvp";
import { CeremonyPage } from "../wedding/CeremonyPage";
import { GalleryPage } from "../wedding/GalleryPage";
import { InvitationSpread } from "../wedding/InvitationSpread";
import { ReceptionPage } from "../wedding/ReceptionPage";
import { RSVPPage } from "../wedding/RSVPPage";
import { StoryPage } from "../wedding/StoryPage";

interface WebGLFallbackProps {
  repository: RSVPRepository;
}

export const WebGLFallback = ({ repository }: WebGLFallbackProps) => (
  <article className="webgl-fallback">
    <header className="fallback-notice">
      <p className="eyebrow">A CLASSIC INVITATION</p>
      <p>The complete wedding story is available below.</p>
    </header>
    <InvitationSpread />
    <StoryPage />
    <CeremonyPage />
    <ReceptionPage />
    <GalleryPage />
    <RSVPPage repository={repository} />
  </article>
);
