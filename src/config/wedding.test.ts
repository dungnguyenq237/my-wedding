import { describe, expect, it } from "vitest";

import { assetUrl, coupleInitials, weddingConfig } from "./wedding";

describe("wedding configuration", () => {
  it("defines the complete book journey in display order", () => {
    expect(weddingConfig.pages.map((page) => page.id)).toEqual([
      "invitation",
      "story",
      "ceremony",
      "reception",
      "gallery",
      "rsvp",
    ]);
  });

  it("builds deployment-base-aware static asset URLs", () => {
    expect(assetUrl("images/couple-01.jpg")).toBe(
      `${import.meta.env.BASE_URL}images/couple-01.jpg`,
    );
    expect(assetUrl("/audio/ambient.mp3")).toBe(
      `${import.meta.env.BASE_URL}audio/ambient.mp3`,
    );
  });

  it("derives display initials from the configured couple", () => {
    expect(coupleInitials).toBe("A & J");
  });
});
