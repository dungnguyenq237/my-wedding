import type { BookStatus } from "../../hooks/useBookNavigation";
import type { RSVPRepository } from "../../repositories/rsvp";
import type { WeddingPageId } from "../../types/wedding";
import { CeremonyPage } from "./CeremonyPage";
import { GalleryPage } from "./GalleryPage";
import { InvitationSpread } from "./InvitationSpread";
import { ReceptionPage } from "./ReceptionPage";
import { RSVPPage } from "./RSVPPage";
import { StoryPage } from "./StoryPage";

const pageComponents: Record<
  WeddingPageId,
  (repository: RSVPRepository) => React.ReactNode
> = {
  invitation: () => <InvitationSpread />,
  story: () => <StoryPage />,
  ceremony: () => <CeremonyPage />,
  reception: () => <ReceptionPage />,
  gallery: () => <GalleryPage />,
  rsvp: (repository) => <RSVPPage repository={repository} />,
};

interface WeddingContentProps {
  currentPage: WeddingPageId;
  status: BookStatus;
  repository: RSVPRepository;
}

export const WeddingContent = ({
  currentPage,
  status,
  repository,
}: WeddingContentProps) => (
  <div
    className="book-content"
    data-turning={status === "turning"}
    aria-live="polite"
  >
    <div key={currentPage} className="page-enter">
      {pageComponents[currentPage](repository)}
    </div>
  </div>
);

