import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { RSVPRepository } from "../../repositories/rsvp";
import { WebGLFallback } from "./WebGLFallback";

describe("WebGLFallback", () => {
  it("keeps every wedding section and RSVP available without WebGL", () => {
    const repository: RSVPRepository = { submit: vi.fn() };
    render(<WebGLFallback repository={repository} />);

    expect(screen.getByRole("heading", { name: /wedding invitation/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /our story/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /wedding ceremony/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /wedding reception/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /our gallery/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /will you join us/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send rsvp/i })).toBeInTheDocument();
  });
});

