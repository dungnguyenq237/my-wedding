import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { RSVPRepository } from "../../repositories/rsvp";
import { RSVPForm } from "./RSVPForm";

describe("RSVPForm", () => {
  it("shows accessible validation errors instead of submitting invalid data", async () => {
    const submit = vi.fn();
    const repository: RSVPRepository = { submit };
    render(<RSVPForm repository={repository} />);

    await userEvent.click(screen.getByRole("button", { name: /send rsvp/i }));

    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });

  it("submits valid data and replaces the form with a success state", async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    const repository: RSVPRepository = { submit };
    render(<RSVPForm repository={repository} />);

    await userEvent.type(screen.getByLabelText(/guest name/i), "Example Guest");
    await userEvent.clear(screen.getByLabelText(/number of guests/i));
    await userEvent.type(screen.getByLabelText(/number of guests/i), "2");
    await userEvent.click(screen.getByLabelText(/joyfully accept/i));
    await userEvent.type(screen.getByLabelText(/message/i), "Synthetic test message");
    await userEvent.click(screen.getByRole("button", { name: /send rsvp/i }));

    expect(submit).toHaveBeenCalledWith({
      name: "Example Guest",
      guests: 2,
      attendance: "accept",
      message: "Synthetic test message",
    });
    expect(await screen.findByRole("status")).toHaveTextContent(/thank you/i);
  });

  it("retains the form and announces a retryable storage failure", async () => {
    const repository: RSVPRepository = {
      submit: vi.fn().mockRejectedValue(new Error("Storage blocked")),
    };
    render(<RSVPForm repository={repository} />);

    await userEvent.type(screen.getByLabelText(/guest name/i), "Example Guest");
    await userEvent.click(screen.getByLabelText(/joyfully accept/i));
    await userEvent.click(screen.getByRole("button", { name: /send rsvp/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not save/i);
    expect(screen.getByLabelText(/guest name/i)).toHaveValue("Example Guest");
    expect(screen.getByRole("button", { name: /send rsvp/i })).toBeInTheDocument();
  });
});
