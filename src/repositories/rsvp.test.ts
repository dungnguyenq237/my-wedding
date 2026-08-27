import { beforeEach, describe, expect, it } from "vitest";

import { LocalStorageRSVPRepository } from "./rsvp";

describe("LocalStorageRSVPRepository", () => {
  beforeEach(() => localStorage.clear());

  it("serializes a validated RSVP with a submission timestamp", async () => {
    const repository = new LocalStorageRSVPRepository();
    await repository.submit({
      name: "Example Guest",
      guests: 2,
      attendance: "accept",
      message: "Synthetic test message",
    });

    const stored = localStorage.getItem("my-wedding:rsvp");
    expect(stored).toContain('"name":"Example Guest"');
    expect(stored).toContain('"guests":2');
    expect(stored).toContain('"attendance":"accept"');
    expect(stored).toContain('"message":"Synthetic test message"');
    expect(stored).toMatch(/"submittedAt":"[^"]+"/);
  });
});
