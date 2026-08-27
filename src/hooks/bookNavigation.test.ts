import { describe, expect, it } from "vitest";

import { bookReducer, initialBookState } from "./useBookNavigation";

describe("bookReducer", () => {
  it("moves from closed through opening to open", () => {
    const opening = bookReducer(initialBookState, { type: "OPEN" });
    expect(opening.status).toBe("opening");

    const opened = bookReducer(opening, { type: "OPEN_COMPLETE" });
    expect(opened).toEqual({
      status: "open",
      pageIndex: 0,
      turnDirection: null,
    });
  });

  it("completes a forward page turn before changing the active page", () => {
    const openState = { ...initialBookState, status: "open" as const };
    const turning = bookReducer(openState, { type: "TURN", direction: 1 });

    expect(turning).toMatchObject({
      status: "turning",
      pageIndex: 0,
      turnDirection: 1,
    });

    expect(bookReducer(turning, { type: "TURN_COMPLETE" })).toMatchObject({
      status: "open",
      pageIndex: 1,
      turnDirection: null,
    });
  });

  it("ignores overlapping navigation and clamps book boundaries", () => {
    const turning = {
      status: "turning" as const,
      pageIndex: 2,
      turnDirection: 1 as const,
    };
    expect(bookReducer(turning, { type: "TURN", direction: 1 })).toBe(turning);

    const firstPage = { ...initialBookState, status: "open" as const };
    expect(bookReducer(firstPage, { type: "TURN", direction: -1 })).toBe(
      firstPage,
    );
  });
});

