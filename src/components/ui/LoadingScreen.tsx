import { coupleInitials, weddingConfig } from "../../config/wedding";

export const LoadingScreen = () => (
  <div className="loading-screen" role="status" aria-live="polite">
    <div className="loading-monogram" aria-hidden="true">
      {coupleInitials.split(" & ")[0]} <span>&amp;</span>{" "}
      {coupleInitials.split(" & ")[1]}
    </div>
    <p>
      {weddingConfig.couple.bride.name.split(" ")[0]} &amp;{" "}
      {weddingConfig.couple.groom.name.split(" ")[0]}
    </p>
    <span>Our story is about to begin…</span>
    <i aria-hidden="true" />
  </div>
);
